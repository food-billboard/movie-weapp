import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtForm, AtButton, AtTag } from 'taro-ui'
import { pick } from 'lodash'
import ChargePicker from '../rangeCharge'
import BaseForm from '~components/wrapForm'
import DateRangePicker from '../rangeDatePicker'
import TagList from '~components/tagList'
import { createFieldsStore } from '~components/wrapForm/fieldsStore'
import ComponentCheckbox from '~components/checkbox'
import GCheckbox, { EDataType } from '../../../issue/components/checkbox'
import { FormData } from '../../interface'
import { TypeColor } from '~theme/color'
import style from '~theme/style'
import List from '~components/linearlist'
import { IList } from '~components/linearlist'
import { SYSTEM_PAGE_SIZE } from '~config'
import { withTry, router, routeAlias } from '~utils'
import { Item } from '~components/indexes'
import { EIndexesType } from '../../../issue/interface'

import './index.scss'

export interface IProps {
    screen: (formData: Partial<FormData>) => void
    visible: boolean 
}
  
interface FeeOption {
    value: string,
    label: string,
    disabled: boolean
}

export interface FormDefault {
    feeOptions: Array<FeeOption>
}

export interface IState {
    open: boolean
}

const TAT_STYLE = {
    boxSizing: 'border-box', 
    border: `1px dashed ${TypeColor['primary']}`, 
    width:'100%', 
    marginBottom: '5px', 
    color: TypeColor['primary']
}

const tagStyle: any = {
    ...TAT_STYLE,
    border: `1px dashed ${TypeColor['primary']}`, 
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
        time: '',
        actor: [],   //演员
        director: [],   //导演
        language: [],   //语言
        district: [],   //地区
    }

    private chargeRef = React.createRef<ChargePicker>()

    private actorRef = React.createRef<TagList>()

    private directorRef = React.createRef<TagList>()

    private districtRef = React.createRef<TagList>()

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
                disabled: true
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

    //搜索条件数据检验
    public filterFactor = () => {
        const values = fieldsStore.getFieldsValue()
        const {
            price: { max, min },
            time: { start, end },
            // director,
            // actor,
            // district,
            ...nextProps
        } = pick(values, ['price', 'time', 'classify'])

        let data: Partial<FormData> = {
            maxPrice: max,
            minPrice: min,
            time: `${start}_${end}`,
            // director: director.map(item => item._id),
            // actor: actor.map(item => item._id),
            // district: district.map(item => item._id),
            ...nextProps
        }
        return data
    }

    //筛选提交
    public onSubmit = async () => {
        const data = this.filterFactor()
        Taro.showLoading({title: '稍等', mask: true})
        await withTry(this.props.screen)(data ? data : this.formData)
        Taro.hideLoading()
    }

    //筛选重置
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

    //是否选择免费
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

    public handleIndexesVisible = (config: {
        type: EIndexesType
    }) => {
        const { type } = config
        const prevValue = fieldsStore?.getFieldValue(type) || []
        router.push(routeAlias.indexes, { url: routeAlias.search,type, value: JSON.stringify(prevValue || []) })
    }

    //索引选择
    public handleIndexesAppend = (item: Item, type:EIndexesType) => {
        const { key, name } = item 
        let ref: any
        switch(type) {
            case EIndexesType.actor: ref = this.actorRef; break;
            case EIndexesType.director: ref = this.directorRef; break;
            case EIndexesType.district: ref = this.districtRef; break;
        }
        ref.current!.handleAppend({ name, key })
    }

    public render() {
        const { open } = this.state
        const { feeOptions } = this.formDefault

        return (
            <AtForm
                customStyle={{
                    ...style.backgroundColor('bgColor'),
                    position:'relative',
                    left:0,
                    top:0,
                    height: '100%'
                }}
            >
                <BaseForm name="search-select" style={{height: '100vh', overflowY: 'auto', overflowX: 'hidden'}}>
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
                            // handleChange={fieldsStore.getFieldProps('fee', 'onChange', {
                            //     getOnChangeValue(value) {
                            //         that.feeChange(value)
                            //         return value
                            //     },
                            //     initialValue: ["free"]
                            // })}
                            // value={fieldsStore.getFieldValue('fee')}
                            value={["free"]}
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
                            disabled
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
                            type={EDataType.CLASSIFY}
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
                                initialValue: { start: '', end: '' }
                            })}
                            value={fieldsStore.getFieldValue('time')}
                            
                        ></DateRangePicker>
                    </View>
                    {/** 复杂筛选功能 暂时不需要*/}
                    {/* <List
                        list={[{...this.detailScreenBtn, arrow: open ? 'up' : 'down'}]}
                        style={{ paddingBottom: open ? 0 : SYSTEM_PAGE_SIZE(92) + 'px' }}
                    ></List> */}
                    <View className='other' style={{display: open ? 'block' : 'none', paddingBottom: open ? SYSTEM_PAGE_SIZE(92) + 'px' : 0}}>
                        <View className='actor'>
                            <AtTag 
                                onClick={this.handleIndexesVisible.bind(this, { type: EIndexesType.actor })}
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
                                onClick={this.handleIndexesVisible.bind(this, { type: EIndexesType.director })}
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
                                type={EDataType.LANGUAGE}
                                handleChange={fieldsStore.getFieldProps('language', 'onChange', {
                                    initialValue: []
                                })}
                                value={fieldsStore.getFieldValue('language')}
                            ></GCheckbox>
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
                    <View className='btn'>
                        <AtButton 
                            onClick={this.onReset}
                            type='secondary' 
                            customStyle={{
                                ...style.backgroundColor('disabled'),
                                ...style.border(1, 'primary', 'solid', 'all'),
                                ...style.color('primary')
                            }}
                        >重置</AtButton>
                        <AtButton 
                            onClick={this.onSubmit}
                            type='primary' 
                            customStyle={{...style.backgroundColor('primary'), ...style.border(1, 'primary', 'solid', 'all'), ...style.color('disabled')}}
                        >确定</AtButton>
                    </View>
                </BaseForm>
            </AtForm>
        )
    }
}