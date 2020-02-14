import Taro, {Component} from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import GPicker from '~components/picker'
import GInput from '../../../../issue/components/description'
import { AtForm, AtInput, AtButton, AtCheckbox, AtList, AtListItem } from 'taro-ui'
import { FormData } from '../../../interface'
import './index.scss'
import { connect } from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { Toast } from '~components/toast'
import { IFormData } from '~pages/issue/interface'

interface IType {
    id: string,
    value: string,
    img: string
}

interface IProps {
    screen: (formData: FormData) => void
    getType: () => any
}

interface FeeOption {
    value: string,
    label: string,
    disabled: boolean
}

interface FormDefault {
    feeOptions: Array<FeeOption>
}

interface IState {
    formData: FormData,
    formDefault: FormDefault,
    type: Array<string>
    types: Array<IType>
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Forms extends Component<IProps> {

    public formData: FormData = {
        maxPrice:0, //价格上限
        minPrice: 0,    //价格下限
        priceDisable: false,    //免费
        fee: [],   //是否免费
        type: '全部',   //电影类型
        startDate: 1888,  //起始时间,
        endDate: new Date().getFullYear(),    //结束时间,
        // actor: ''   //演员
    }

    //最低价格
    public minPriceRef = Taro.createRef<GInput>()

    //最高价格
    public maxPriceRef = Taro.createRef<GInput>()

    //类型
    public typeRef = Taro.createRef<GPicker>()

    //起始时间
    public startTimeRef = Taro.createRef<GPicker>()

    //结束时间
    public endTimeRef = Taro.createRef<GPicker>()

    public componentDidMount = () => {
        this.fetchTypeData()
    }

    public constructor() {
        super(...arguments)

        this.onSubmit = this.onSubmit.bind(this)
        this.onReset = this.onReset.bind(this)
        // this.onDateChange = this.onDateChange.bind(this)
    }

    /**
     * 类型数据获取
     */
    public fetchTypeData = async () => {
        Taro.showLoading({mask: true, title: '加载中'})
        const data = await this.props.getType()
        const _data = data.switch
        const list = _data.map(val => {
            const { value } = val
            return value
        })
        this.setState({
            type: list,
            types: _data
        })
        Taro.hideLoading()
    }

    public state: IState = {
        formData: Object.assign({}, this.formData),
        formDefault: {
            feeOptions: [
                {
                    value: '免费',
                    label: '免费',
                    disabled: false
                },
                {
                    value: '付费',
                    label: '付费',
                    disabled: false
                }
            ]
        },
        type: [],
        types: []
    }

    /**
     * 搜索条件数据检验
     */
    public filterFactor = async() => {
        const {formData} = this.state
        if(formData.priceDisable) {     //免费
            delete formData.maxPrice
            delete formData.minPrice
        }
        const startTime = this.startTimeRef.current!.state!.value
        const endTime = this.endTimeRef.current!.state!.value
        const minPrice = this.minPriceRef.current!.state!.value
        const maxPrice = this.maxPriceRef.current!.state!.value
        //日期检查
        if( startTime.length && endTime.length) {
            if(startTime > endTime) {
                await Toast({
                    title: '起始时间有误',
                    icon: 'fail', 
                })
                return
            }
        }
        if(minPrice.length && maxPrice.length) {
            if(minPrice > maxPrice) {
                console.log(minPrice > maxPrice)
                await Toast({
                    title: '价格不能为负数',
                    icon: 'fail',
                })
                return
            }
        }
        let data:FormData = { ...formData, ...{maxPrice, minPrice, startDate: startTime, endDate: endTime} }
        await this.setState({
            formData: data
        })
        // return data
    }

    /**
     * 筛选提交
     */
    public onSubmit = async () => {
        const data:FormData = await this.filterFactor()
        await this.props.screen(data)
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
        await this.setState({
            formData: Object.assign({}, this.formData)
        })
    }

    /**
     * 是否免费选择
     */
    public feeChange = (value:Array<string>) => {
        const { formData } = this.state
        formData.fee = value
        if(value.includes('免费') && value.length === 1) {
            formData.priceDisable = true
        }else {
            formData.priceDisable = false
        }
        this.setState({
            formData
        })
    }

    // /**
    //  * 金额选择
    //  */
    // public handlePrice = (type:number, value:number, event:any) => {
    //     const { formData, formDefault } = this.state
    //     if(type > 0) {
    //         formData.maxPrice = value
    //     }else {
    //         formData.minPrice = value
    //     }
    //     this.setState({
    //         formData
    //     })
    // }

    // /**
    //  * 类型选择
    //  */
    // public typeChange(event) {
    //     const target = event.detail.value - 0
    //     const { formData, type, types } = this.state
    //     const id = types.filter(val => {
    //         const { value } = val
    //         return type[target] === value
    //     })
    //     formData.type = id[0].id
    //     this.setState({
    //         formData
    //     })
    // }

    // /**
    //  * 时间选择
    //  */
    // public onDateChange(type:number, event:any) {
    //     const value = event.detail.value - 0
    //     const { formData } = this.state
    //     if(type > 0) {
    //         formData.endDate = value
    //     }else {
    //         formData.startDate = value
    //     }
    //     this.setState({
    //         formData
    //     })
    // }

    public render() {
        const { formDefault, formData, type: movieType } = this.state
        const { feeOptions } = formDefault
        const { maxPrice, minPrice, fee, priceDisable, type, startDate, endDate } = formData
        return (
            <AtForm
                onSubmit={this.onSubmit}
                onReset={this.onReset}
            >
                <View className='fee'>
                    <AtCheckbox
                        options={feeOptions}
                        selectedList={fee}
                        onChange={this.feeChange}
                    />
                </View>
                <View className='price'>
                    <View className='low'>
                        <GInput
                            inputType={'number'}
                            placeholder={'最低价格'}
                            disabled={priceDisable}
                            ref={this.minPriceRef}
                        ></GInput>
                        {/* <AtInput
                            border={true}
                            name='最低价格'
                            title='最低价格'
                            type='number'
                            placeholder='最低价格'
                            value={minPrice}
                            onChange={(value,event) => {this.handlePrice.call(this, -1, value, event)}}
                            disabled={priceDisable}
                        /> */}
                    </View>
                    <View className='high'>
                        <GInput
                            inputType={'number'}
                            placeholder={'最高价格'}
                            disabled={priceDisable}
                            ref={this.maxPriceRef}
                        ></GInput>
                        {/* <AtInput
                            name='最高价格'
                            title='最高价格'
                            type='number'
                            placeholder='最高价格'
                            value={maxPrice}
                            onChange={(value,event) => {this.handlePrice.call(this, 1, value, event)}}
                            disabled={priceDisable}
                        /> */}
                    </View>
                </View>
                <View className='type'>
                    <GPicker
                        selector={{range: movieType}}
                        title={'类型选择'}
                        ref={this.typeRef}
                    >
                    </GPicker>
                    {/* <Picker 
                        mode='selector' 
                        range={this.state.type} 
                        onChange={this.typeChange}
                    >
                        <View className='picker'>
                            类型选择：{this.state.type[formData.type] || '全部'}
                        </View>
                    </Picker> */}
                </View>
                <View className='time'>
                    <GPicker
                        date={{fields: 'year'}}
                        title={'起始时间'}
                        style={{marginBottom: '5px'}}
                        ref={this.startTimeRef}
                    >
                    </GPicker>
                    {/* <Picker 
                        className='list'
                        mode='date' 
                        onChange={(event) => {this.onDateChange.call(this, -1, event)}}
                        fields='year'
                        start={1888}
                        end={new Date().getFullYear()}
                    >
                        <View className='picker'>
                            起始时间：{startDate}
                        </View>
                    </Picker> */}
                    <GPicker
                        date={{fields: 'year'}}
                        title={'结束时间'}
                        ref={this.endTimeRef}
                    >
                    </GPicker>
                    {/* <Picker 
                        className='list'
                        mode='date' 
                        onChange={(event) => {this.onDateChange.call(this, 1, event)}}
                        fields='year'
                        end={new Date().getFullYear()}
                        start={1888}
                    >
                        <View className='picker'>
                            结束时间：{endDate}
                        </View>
                    </Picker> */}
                </View>
                {/* <View className='other'>
                    <AtList>
                        {this.props.other.map ? this.props.other.map((value, index) => {
                            const { handleClick, title } = value
                            return (
                                <AtListItem 
                                    key={index}
                                    title={title} 
                                    onClick={handleClick} 
                                    arrow='down'
                                />
                            )
                        }) : ''}
                        <AtListItem title='标题文字' onClick={this.handleClick} />
                        <AtListItem title='标题文字' arrow='right' />
                        <AtListItem title='标题文字' extraText='详细信息' />
                        <AtListItem title='禁用状态' disabled extraText='详细信息' />
                    </AtList>
                </View> */}
                <View className='btn'>
                    <AtButton formType='reset' type='secondary'>重置</AtButton>
                    <AtButton formType='submit' type='primary'>确定</AtButton>
                </View>
            </AtForm>
        )
    }
}