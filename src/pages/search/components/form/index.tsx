import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import GPicker from '~components/picker'
import ChargePicker from '../rangeCharge'
import BaseForm from '~components/wrapForm'
import DateRangePicker from '../rangeDatePicker'
import TagList from '~components/tagList'
import { AtForm, AtButton, AtTag } from 'taro-ui'
import { createFieldsStore } from '~components/wrapForm/fieldsStore'
import ComponentCheckbox from '~components/checkbox'
import GCheckbox from '../../../issue/components/checkbox'
import { IState, IProps, FormDefault } from './index.d'
import { FormData } from '../../interface'
import { TypeColor } from '~theme/color'
import style from '~theme/style'
import List from '~components/linearlist'
import { IList } from '~components/linearlist/index.d'
import { SYSTEM_PAGE_SIZE } from '~config'
import { withTry } from '~utils'
import { Item } from '~components/indexes/index.d'
import { TIndexesType } from '../../../issue/interface'

import './index.scss'

const TAT_STYLE = {
    boxSizing: 'border-box', 
    border: `1px dashed ${TypeColor['primary']}`, 
    width:'100%', 
    marginBottom: '5px', 
    color: TypeColor['primary']
}

const ICON_COLOR = 'primary'

const fieldsStore = createFieldsStore('issue', {
    getOnChangeValue(value) {
        return value
    }
})

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
        language: [],   //语言
        district: [],   //地区
    }

    private chargeRef = Taro.createRef<ChargePicker>()

    private actorRef = Taro.createRef<TagList>()

    private directorRef = Taro.createRef<TagList>()

    private districtRef = Taro.createRef<TagList>()

    public componentDidMount = () => {
        fieldsStore.setUpdate(this.forceUpdate.bind(this))
    }

    public state: IState = {
        open: false
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
    public filterFactor = () => {
        const values = fieldsStore.getFieldsValue()
        const {
            price: {max, min},
            time: {start, end},
            director,
            actor,
            district,
            ...nextProps
        } = values
        console.log(values)
        let data: FormData = {
            maxPrice: max,
            minPrice: min,
            startDate: start,
            endDate: end,
            director: director.map(item => item.key),
            actor: actor.map(item => item.key),
            district: district.map(item => item.key),
            ...nextProps
        }
        return data

    }

    /**
     * 筛选提交
     */
    public onSubmit = async () => {
        const data = this.filterFactor()
        Taro.showLoading({title: '稍等', mask: true})
        await withTry(this.props.screen)(data ? data : this.formData)
        Taro.hideLoading()
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
        fieldsStore.resetFields()
        this.setState({
            open: false
        })
    }

    /**
     * 是否选择免费
     */
    public feeChange = (value:Array<string>) => {
        let status = false
        if(value.includes('free') && value.length === 1) {
            status = true
        }
        this.chargeRef.current!.setDisabled(status)
    }

    //处理其他筛选
    public handleOther = (value) => {
        this.setState({
            open: value
        })
    }

    //索引选择
    public handleIndexesAppend = (item: Item, type:TIndexesType) => {
        const { key, name } = item 
        let ref
        switch(type) {
            case 'ACTOR': ref = this.actorRef; break;
            case 'DIRECTOR': ref = this.directorRef; break;
            case 'DISTRICT': ref = this.districtRef; break;
        }
        ref.current!.handleAppend({ name, key })
    }

    public render() {
        const { open } = this.state
        const { feeOptions } = this.formDefault

        const tagStyle = {
            ...TAT_STYLE,
            border: `1px dashed ${TypeColor['primary']}`, 
            color: TypeColor['primary']
        }

        const that = this

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
                <BaseForm name="search-select">
                    <View className='fee'>
                        <AtTag 
                            customStyle={tagStyle} 
                            type={'primary'}
                        >
                            价格选择
                        </AtTag>
                        <ComponentCheckbox
                            checkboxOption={feeOptions}
                            needHiddenList={false}
                            handleChange={fieldsStore.getFieldProps('fee', 'onChange', {
                                getOnChangeValue(value) {
                                    that.feeChange(value)
                                    return value
                                },
                                initialValue: []
                            })}
                            value={fieldsStore.getFieldValue('fee')}
                        ></ComponentCheckbox>
                    </View>
                    <View className='price'>
                        <ChargePicker
                            ref={this.chargeRef}
                            onChange={fieldsStore.getFieldProps('price', 'onChange', {
                                getOnChangeValue(value) {
                                    const data = fieldsStore.getFieldValue('price') || {}
                                    return {
                                        ...data,
                                        ...value
                                    }
                                },
                                initialValue: {max: '', min: ''}
                            })}
                            value={fieldsStore.getFieldValue('price')}
                        />
                    </View>
                    <View className='classify'>
                        <AtTag 
                            customStyle={tagStyle} 
                            type={'primary'}
                        >
                            分类
                        </AtTag>
                        <GCheckbox
                            type={'CLASSIFY'}
                            handleChange={fieldsStore.getFieldProps('classify', 'onChange', {
                                initialValue: []
                            })}
                            value={fieldsStore.getFieldValue('classify')}
                        ></GCheckbox>
                    </View>
                    <View className='time'>
                        <AtTag 
                            customStyle={tagStyle} 
                            type={'primary'}
                        >
                            时间选择
                        </AtTag>
                        <DateRangePicker
                            onChange={fieldsStore.getFieldProps('time', 'onChange', {
                                getOnChangeValue(value) {
                                    const data = fieldsStore.getFieldValue('time') || {}
                                    return {
                                        ...data,
                                        ...value
                                    }
                                },
                                initialValue: {start: '', end: ''}
                            })}
                            value={fieldsStore.getFieldValue('time')}
                        ></DateRangePicker>
                    </View>
                    <List
                        list={[{...this.detailScreenBtn, arrow: open ? 'up' : 'down'}]}
                        style={open ? {} : {paddingBottom: SYSTEM_PAGE_SIZE(92) + 'px'}}
                    ></List>
                    {
                        open && <View className='other'>
                            <View className='actor'>
                                <AtTag 
                                    onClick={this.props.indexesShow.bind(this, { visible: true, type: 'ACTOR' })}
                                    customStyle={{...tagStyle, marginTop: '20px'}} 
                                    type={'primary'}
                                >
                                    演员
                                </AtTag>
                                <TagList
                                    ref={this.actorRef}
                                    style={{marginBottom: '20px'}}
                                    list={fieldsStore.getFieldValue('actor')}
                                    handleChange={
                                    fieldsStore.getFieldProps('actor', 'onChange', {
                                        rules: [
                                        {
                                            required: true
                                        }
                                        ],
                                        initialValue: [],
                                        getOnChangeValue(value) {
                                            return value
                                        }
                                    })
                                    }
                                ></TagList>
                            </View>
                            <View className='director'>
                                <AtTag 
                                    onClick={this.props.indexesShow.bind(this, { visible: true, type: 'DIRECTOR' })}
                                    customStyle={tagStyle} 
                                    type={'primary'}
                                >
                                    导演
                                </AtTag>
                                <TagList
                                    ref={this.directorRef}
                                    style={{marginBottom: '20px'}}
                                    list={fieldsStore.getFieldValue('director')}
                                    handleChange={
                                    fieldsStore.getFieldProps('director', 'onChange', {
                                        rules: [
                                        {
                                            required: true
                                        }
                                        ],
                                        initialValue: [],
                                        getOnChangeValue(value) {
                                            return value
                                        }
                                    })
                                    }
                                ></TagList>
                            </View >
                            <View className='language'>
                                <AtTag 
                                    customStyle={tagStyle} 
                                    type={'primary'}
                                >
                                    语言
                                </AtTag>
                                <GCheckbox
                                    type={'LANGUAGE'}
                                    handleChange={fieldsStore.getFieldProps('language', 'onChange', {
                                        initialValue: []
                                    })}
                                    value={fieldsStore.getFieldValue('language')}
                                ></GCheckbox>
                                <GPicker
                                    selector={{range: lang.map((val: any) => {
                                    const { value } = val
                                    return value
                                    })}}
                                    handleChange={fieldsStore.getFieldProps('lang', 'onChange', {
                                        initialValue: []
                                    })}
                                    value={fieldsStore.getFieldValue('lang')}
                                ></GPicker>
                            </View>
                            <View className='area'>
                                <AtTag 
                                    customStyle={tagStyle} 
                                    type={'primary'}
                                >
                                    地区
                                </AtTag>
                                <TagList
                                    ref={this.districtRef}
                                    style={{marginBottom: '20px'}}
                                    list={fieldsStore.getFieldValue('district')}
                                    handleChange={
                                    fieldsStore.getFieldProps('district', 'onChange', {
                                        rules: [
                                        {
                                            required: true
                                        }
                                        ],
                                        initialValue: [],
                                        getOnChangeValue(value) {
                                            return value
                                        }
                                    })
                                    }
                                ></TagList>
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
                </BaseForm>
            </AtForm>
        )
    }
}