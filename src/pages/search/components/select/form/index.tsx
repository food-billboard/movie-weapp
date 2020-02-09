import Taro, {Component} from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtCheckbox, AtList, AtListItem } from 'taro-ui'
import { FormData } from '../../../interface'
import './index.scss'
import { connect } from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

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

    public componentDidMount = () => {
        this.fetchTypeData()
    }

    public constructor() {
        super(...arguments)

        this.onSubmit = this.onSubmit.bind(this)
        this.onReset = this.onReset.bind(this)
        this.onDateChange = this.onDateChange.bind(this)
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
        if(formData.startDate > formData.endDate) {     //筛选日期检测
            Taro.showToast({
                title: '起始时间不能大于结束时间',
                icon: 'none',
                duration: 2000,
                mask: true
            })
            return
        }
        if(formData.maxPrice < formData.minPrice) {
            Taro.showToast({
                title: '最高价格不能低于最低价格',
                icon: 'none',
                duration: 2000,
                mask: true              
            })
            return
        }
        if(formData.maxPrice < 0 || formData.minPrice < 0) {
            Taro.showToast({
                title: '价格不能为负数',
                icon: 'none',
                duration: 2000,
                mask: true
            })
            return
        }
        await this.setState({
            formData
        })
    }

    /**
     * 筛选提交
     */
    public onSubmit = async () => {
        this.filterFactor()
        const {formData} = this.state
        await this.props.screen(formData)
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

    /**
     * 金额选择
     */
    public handlePrice = (type:number, value:number, event:any) => {
        const { formData, formDefault } = this.state
        if(type > 0) {
            formData.maxPrice = value
        }else {
            formData.minPrice = value
        }
        this.setState({
            formData
        })
    }

    /**
     * 类型选择
     */
    public typeChange(event) {
        const target = event.detail.value - 0
        const { formData, type, types } = this.state
        const id = types.filter(val => {
            const { value } = val
            return type[target] === value
        })
        formData.type = id[0].id
        this.setState({
            formData
        })
    }

    /**
     * 时间选择
     */
    public onDateChange(type:number, event:any) {
        const value = event.detail.value - 0
        const { formData } = this.state
        if(type > 0) {
            formData.endDate = value
        }else {
            formData.startDate = value
        }
        this.setState({
            formData
        })
    }

    public render() {
        const { formDefault, formData } = this.state
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
                        <AtInput
                            border={true}
                            name='最低价格'
                            title='最低价格'
                            type='number'
                            placeholder='最低价格'
                            value={minPrice}
                            onChange={(value,event) => {this.handlePrice.call(this, -1, value, event)}}
                            disabled={priceDisable}
                        />
                    </View>
                    <View className='high'>
                        <AtInput
                            name='最高价格'
                            title='最高价格'
                            type='number'
                            placeholder='最高价格'
                            value={maxPrice}
                            onChange={(value,event) => {this.handlePrice.call(this, 1, value, event)}}
                            disabled={priceDisable}
                        />
                    </View>
                </View>
                <View className='type'>
                    <Picker 
                        mode='selector' 
                        range={this.state.type} 
                        onChange={this.typeChange}
                    >
                        <View className='picker'>
                            类型选择：{this.state.type[formData.type] || '全部'}
                        </View>
                    </Picker>
                </View>
                <View className='time'>
                    <Picker 
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
                    </Picker>
                    <Picker 
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
                    </Picker>
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