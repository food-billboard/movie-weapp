import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import GPicker from '~components/picker'
import GInput from '~components/input'
import { AtForm, AtButton, AtAccordion, AtTag } from 'taro-ui'
import './index.scss'
import { connect } from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { Toast } from '~components/toast'
import GCheckbox from '~components/checkbox'
import { IState, IProps, FormDefault } from './index.d'
import { FormData } from '../../interface'
import { TypeColor } from '~theme/color'
import style from '~theme/style'
import List from '~components/linearlist'
import { IList } from '~components/linearlist/index.d'

const TAT_STYLE = {
    boxSizing: 'border-box', 
    border: `1px dashed ${TypeColor['primary']}`, 
    width:'100%', 
    marginBottom: '5px', 
    color: TypeColor['primary']
}

const ICON_COLOR = 'primary'

@connect(mapStateToProps, mapDispatchToProps)
export default class Forms extends Component<IProps> {

    //表单格式
    readonly formData: FormData = {
        maxPrice:0, //价格上限
        minPrice: 0,    //价格下限
        fee: [],   //是否免费
        type: '',   //电影类型
        startDate: '',  //起始时间,
        endDate: '',    //结束时间,
        actor: [],   //演员
        director: [],   //导演
        lang: '',   //语言
        area: [],   //地区
    }

    //付费免费
    public feeRef = Taro.createRef<GCheckbox>()

    //最低价格
    public minPriceRef = Taro.createRef<GInput>()

    //最高价格
    public maxPriceRef = Taro.createRef<GInput>()

    //类型
    public typeRef = Taro.createRef<GCheckbox>()

    //起始时间
    public startTimeRef = Taro.createRef<GPicker>()

    //结束时间
    public endTimeRef = Taro.createRef<GPicker>()

    //导演
    public directorRef = Taro.createRef<GCheckbox>()

    //演员
    public actorRef = Taro.createRef<GCheckbox>()

    //地区
    public areaRef = Taro.createRef<GCheckbox>()

    //语言
    public langRef = Taro.createRef<GPicker>()

    public componentDidMount = () => {
        this.fetchTypeData()
    }

    public state: IState = {
        lang: [],
        open: false
    }

    /**
     * 类型数据获取
     */
    public fetchTypeData = async () => {
        Taro.showLoading({mask: true, title: '加载中'})
        const language = await this.props.getLanguageList()
        const lang = language.data
        await this.setState({
            lang
        })
        Taro.hideLoading()
    }

    //表单默认属性
    readonly formDefault:FormDefault = {
        feeOptions: [
            {
                value: 'free',
                label: '免费',
                disabled: false
            },
            {
                value: 'fee',
                label: '付费',
                disabled: false
            }
        ]
    }

    //详细筛选控制按钮信息
    readonly detailScreenBtn:IList = {
            title: '其他筛选',
            arrow: 'down',
            handle: () => {
                const { open } = this.state
                this.setState({
                    open: !open
                })
            },
            iconInfo: {
                value: 'numbered-list',
                size: 16, 
                color: TypeColor[ICON_COLOR]
            },
            id: Symbol('other')
        }

    /**
     * 搜索条件数据检验
     */
    public filterFactor = async() => {
        const fee = await this.feeRef.current!.getData(false)
        const startTime = await this.startTimeRef.current!.getData(false)
        const endTime = await this.endTimeRef.current!.getData(false)
        const minPrice = await this.minPriceRef.current!.getData(false)
        const maxPrice = await this.maxPriceRef.current!.getData(false)
        const type = await this.typeRef.current!.getData(false)
        const lang = await this.langRef.current!.getData(false)
        const area = await this.areaRef.current!.getData(false)
        const director = await this.directorRef.current!.getData(false)
        const actor = await this.actorRef.current!.getData(false)
        const isArray = (data, string=false) => {
            return  Array.isArray(data) ? (string ? data.join('') : data) : (data ? data : '')
        }

        //日期检查
        if( startTime && endTime) {
            if(startTime > endTime) {
                Toast({
                    title: '起始时间有误',
                    icon: 'fail', 
                })
                return
            }
        }
        //价格检查
        if(minPrice && maxPrice) {
            if(minPrice > maxPrice) {
                await Toast({
                    title: '价格不能为负数',
                    icon: 'fail',
                })
                return
            }
        }
        let data: FormData = {
            maxPrice: maxPrice ? maxPrice : '',
            minPrice: minPrice ? minPrice : '',
            fee: fee ? fee : [],
            type: isArray(type),
            startDate: isArray(startTime, true),
            endDate: isArray(endTime, true),
            lang: isArray(lang, true),
            area: isArray(area),
            director: isArray(director),
            actor: isArray(actor)
        }
        return data
    }

    /**
     * 筛选提交
     */
    public onSubmit = async () => {
        const data = await this.filterFactor()
        await this.props.screen(data ? data : this.formData)
    }

    /**
     * 筛选重置
     */
    public onReset = async () => {
        const {confirm} = await Taro.showModal({
            title: '提示',
            content: '您的操作会清空当前输入数据! 是否继续?'
        })
        if(!confirm) {
            return
        }
        this.feeRef.current!.reset()
        this.maxPriceRef.current!.reset()
        this.minPriceRef.current!.reset()
        this.startTimeRef.current!.reset()
        this.endTimeRef.current!.reset()
        this.typeRef.current!.reset()
        this.areaRef.current!.reset()
        this.actorRef.current!.reset()
        this.directorRef.current!.reset()
        this.langRef.current!.reset()
        this.setState({
            open: false
        })
    }

    /**
     * 是否选择免费
     */
    public feeChange = (value:Array<string>) => {
        this.feeRef.current!.handleChange(value)
        if(value.includes('free') && value.length === 1) {
            this.minPriceRef.current!.setDisabled(true)
            this.maxPriceRef.current!.setDisabled(true)
        }else {
            this.minPriceRef.current!.setDisabled(false)
            this.maxPriceRef.current!.setDisabled(false)
        }
    }

    //处理其他筛选
    public handleOther = (value) => {
        this.setState({
            open: value
        })
    }

    public render() {
        const { lang, open } = this.state
        const { feeOptions } = this.formDefault

        const tagStyle = {
            ...TAT_STYLE,
            border: `1px dashed ${TypeColor['primary']}`, 
            color: TypeColor['primary']
        }

        return (
            <AtForm
                onSubmit={this.onSubmit}
                onReset={this.onReset}
                customStyle={{
                    ...style.backgroundColor('bgColor'),
                    position:'absolute',
                    left:0,
                    top:0,
                }}
            >
                <View className='fee'>
                    <AtTag 
                        customStyle={tagStyle} 
                        type={'primary'}
                    >
                        价格选择
                    </AtTag>
                    <GCheckbox
                        ref={this.feeRef}
                        handleChange={this.feeChange}
                        checkboxOption={feeOptions}
                        needHiddenList={false}
                        extraFactor={false}
                    ></GCheckbox>
                </View>
                <View className='price'>
                    <View className='low'>
                        <GInput
                            style={{...style.backgroundColor('disabled'), marginBottom: '10px'}}
                            inputType={'number'}
                            placeholder={'最低价格'}
                            ref={this.minPriceRef}
                        ></GInput>
                    </View>
                    <View className='high'>
                        <GInput
                            style={{...style.backgroundColor('disabled')}}
                            inputType={'number'}
                            placeholder={'最高价格'}
                            ref={this.maxPriceRef}
                        ></GInput>
                    </View>
                </View>
                <View className='type'>
                    <AtTag 
                        customStyle={tagStyle} 
                        type={'primary'}
                    >
                        分类
                    </AtTag>
                    <GCheckbox
                        ref={this.typeRef}
                        style={{marginBottom: '20px'}}
                        needHiddenList={false}
                        type={'type'}
                    ></GCheckbox>
                </View>
                <View className='time'>
                    <AtTag 
                        customStyle={tagStyle} 
                        type={'primary'}
                    >
                        时间选择
                    </AtTag>
                    <GPicker
                        date={{fields: 'year'}}
                        title={'起始时间'}
                        style={{marginBottom: '5px'}}
                        ref={this.startTimeRef}
                    >
                    </GPicker>
                    <GPicker
                        date={{fields: 'year'}}
                        title={'结束时间'}
                        style={{paddingBottom:'20px'}}
                        ref={this.endTimeRef}
                    >
                    </GPicker>
                </View>
                <List
                    list={[{...this.detailScreenBtn, arrow: open ? 'up' : 'down'}]}
                    style={open ? {} : {paddingBottom: '92px'}}
                ></List>
                {
                    open && <View className='other'>
                        <View className='actor'>
                            <AtTag 
                                customStyle={{...tagStyle, marginTop: '20px'}} 
                                type={'primary'}
                            >
                                演员
                            </AtTag>
                            <GCheckbox
                                ref={this.actorRef}
                                style={{marginBottom: '20px'}}
                                type={'actor'}
                            ></GCheckbox>
                        </View>
                        <View className='director'>
                            <AtTag 
                                customStyle={tagStyle} 
                                type={'primary'}
                            >
                                导演
                            </AtTag>
                            <GCheckbox
                                ref={this.directorRef}
                                style={{marginBottom: '20px'}}
                                type={'director'}
                            ></GCheckbox>
                        </View >
                        <View className='lang'>
                            <AtTag 
                                customStyle={tagStyle} 
                                type={'primary'}
                            >
                                语言
                            </AtTag>
                            <GPicker
                                ref={this.langRef}
                                selector={{range: lang.map((val: any) => {
                                const { value } = val
                                return value
                                })}}
                            ></GPicker>
                        </View>
                        <View className='area'>
                            <AtTag 
                                customStyle={tagStyle} 
                                type={'primary'}
                            >
                                地区
                            </AtTag>
                            <GCheckbox
                                ref={this.areaRef}
                                style={{marginBottom: '20px'}}
                                type={'area'}
                            ></GCheckbox>
                        </View>
                    </View>
                }
                <View className='btn'>
                    <AtButton 
                        formType='reset' 
                        type='secondary' 
                        customStyle={{
                            ...style.backgroundColor('disabled'),
                            ...style.border(1, 'primary', 'solid', 'all'),
                            ...style.color('primary')
                        }}
                    >重置</AtButton>
                    <AtButton 
                        formType='submit' 
                        type='primary' 
                        customStyle={{...style.backgroundColor('primary'), ...style.border(1, 'primary', 'solid', 'all'), ...style.color('disabled')}}
                    >确定</AtButton>
                </View>
            </AtForm>
        )
    }
}