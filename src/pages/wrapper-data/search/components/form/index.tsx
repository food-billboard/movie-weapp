import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtForm, AtButton, AtTag } from 'taro-ui'
import { pick } from 'lodash'
import BaseForm from '~components/wrapForm'
import TagList from '~components/tagList'
import { createFieldsStore } from '~components/wrapForm/fieldsStore'
import { TypeColor } from '~theme/color'
import style from '~theme/style'
import { IList } from '~components/linearlist'
import { SYSTEM_PAGE_SIZE } from '~config'
import { withTry, router, routeAlias, TaroShowModal } from '~utils'
import { Item } from '~components/indexes'
import GCheckbox, { EDataType } from '../../../issue/components/checkbox'
import DateRangePicker from '../rangeDatePicker'
import ChargePicker from '../rangeCharge'
import { FormData } from '../../interface'
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

const typeColor = TypeColor()

const TAT_STYLE = {
  boxSizing: 'border-box',
  border: `1px dashed ${typeColor['primary']}`,
  width: '100%',
  marginBottom: '5px',
  color: typeColor['primary']
}

const tagStyle: any = {
  ...TAT_STYLE,
  border: `1px dashed ${typeColor['primary']}`,
  color: typeColor['primary']
}

const ICON_COLOR = 'primary'

const fieldsStore = createFieldsStore('issue', {
  getOnChangeValue(value) {
    return value
  }
})

export default class Forms extends Component<IProps> {

  public state: IState = {
    open: false
  }

  public componentDidMount = () => {
    fieldsStore.setUpdate(this.forceUpdate.bind(this))
  }

  //表单格式
  readonly formData: FormData = {
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

  //详细筛选控制按钮信息
  readonly detailScreenBtn: IList = {
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
      color: TypeColor()[ICON_COLOR]
    },
    id: Symbol('other')
  }

  //搜索条件数据检验
  public filterFactor = () => {
    const values = fieldsStore.getFieldsValue()
    const {
      time: { start, end },
      ...nextProps
    } = pick(values, ['time', 'classify'])

    let data: Partial<FormData> = {
      time: `${start}_${end}`,
      ...nextProps
    }
    return data
  }

  //筛选提交
  public onSubmit = async () => {
    const data = this.filterFactor()
    Taro.showLoading({ title: '稍等', mask: true })
    await withTry(this.props.screen)(data ? data : this.formData)
    Taro.hideLoading()
  }

  //筛选重置
  public onReset = async () => {
    const { confirm } = await TaroShowModal({
      title: '提示',
      content: '您的操作会清空当前输入数据! 是否继续?'
    })
    if (!confirm) {
      return
    }
    fieldsStore.resetFields()
    this.setState({
      open: false
    })
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
    router.push(routeAlias.indexes, { url: routeAlias.search, type, value: JSON.stringify(prevValue || []) })
  }

  //索引选择
  public handleIndexesAppend = (item: Item, type: EIndexesType) => {
    const { key, name } = item
    let ref: any
    switch (type) {
      case EIndexesType.actor: ref = this.actorRef; break;
      case EIndexesType.director: ref = this.directorRef; break;
      case EIndexesType.district: ref = this.districtRef; break;
    }
    ref.current!.handleAppend({ name, key })
  }

  public render() {
    const { open } = this.state

    return (
      <AtForm
        customStyle={{
          ...style.backgroundColor('bgColor'),
          position: 'relative',
          left: 0,
          top: 0,
          height: '100%'
        }}
      >
        <BaseForm 
          name='search-select' 
          style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}
        >
          {/* <View className='page-search-form-price'>
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
                initialValue: { max: '', min: '' }
              })}
              value={fieldsStore.getFieldValue('price')}
              disabled
            />
          </View> */}
          <View className='page-search-form-classify'>
            <AtTag
              customStyle={tagStyle}
              type='primary'
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
          <View className='page-search-form-time'>
            <AtTag
              customStyle={tagStyle}
              type='primary'
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
          <View className='page-search-form-other' style={{ display: open ? 'block' : 'none', paddingBottom: open ? SYSTEM_PAGE_SIZE(92) + 'px' : 0 }}>
            <View className='page-search-form-actor'>
              <AtTag
                onClick={this.handleIndexesVisible.bind(this, { type: EIndexesType.actor })}
                customStyle={{ ...tagStyle, marginTop: '20px' }}
                type='primary'
              >
                演员
              </AtTag>
              <TagList
                ref={this.actorRef}
                style={{ marginBottom: '20px' }}
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
            <View className='page-search-form-director'>
              <AtTag
                onClick={this.handleIndexesVisible.bind(this, { type: EIndexesType.director })}
                customStyle={tagStyle}
                type='primary'
              >
                导演
              </AtTag>
              <TagList
                ref={this.directorRef}
                style={{ marginBottom: '20px' }}
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
            <View className='page-search-form-language'>
              <AtTag
                customStyle={tagStyle}
                type='primary'
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
            <View className='page-search-form-area'>
              <AtTag
                customStyle={tagStyle}
                type='primary'
              >
                地区
              </AtTag>
              <TagList
                ref={this.districtRef}
                style={{ marginBottom: '20px' }}
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
          <View className='page-search-form-btn at-row'>
            <AtButton
              onClick={this.onReset}
              type='secondary'
              customStyle={{
                ...style.backgroundColor('disabled'),
                ...style.border(1, 'primary', 'solid', 'all'),
                ...style.color('primary')
              }}
              className='at-col at-col-6'
            >重置</AtButton>
            <AtButton
              onClick={this.onSubmit}
              type='primary'
              className='at-col at-col-6'
              customStyle={{ ...style.backgroundColor('primary'), ...style.border(1, 'primary', 'solid', 'all'), ...style.color('disabled') }}
            >确定</AtButton>
          </View>
        </BaseForm>
      </AtForm>
    )
  }
}