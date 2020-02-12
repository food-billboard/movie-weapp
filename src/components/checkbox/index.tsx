import Taro, { Component } from '@tarojs/taro'
import { AtCheckbox, AtButton, AtTag } from 'taro-ui'
import { View } from '@tarojs/components'

import './index.scss'

interface IOption {
  value: string
  label: string
  desc?: string
  disabled?: boolean
}

interface IProps {
  checkboxOption: Array<IOption>
  checkedList: Array<IOption>
}

interface IState {
  checkedList: Array<string>
  show: boolean
}

const BUTTON_STYLE = {
  height:'40px'
}

export default class extends Component<IProps, IState> {

  public state: IState = {
    checkedList: [],
    show: false
  }

  //可选参数
  // readonly checkboxOption = this.props.checkboxOption

  //处理选择
  public handleChange = (value: any) => {
    this.setState({
      checkedList: value
    })
  }

  //打开
  public open = () => {
    this.setState({
      show: true
    })
  }

  //收起
  public close = () => {
    this.setState({
      show: false
    })
  }

  public render() {
    const { checkedList, show } = this.state
    const { checkboxOption=[] } = this.props
    return (
      <View>
        <View className='at-row at-row__align--center at-row--wrap'>
          {
            checkboxOption.filter((val:IOption) => {
              const { value } = val
              return checkedList.indexOf(value) !== -1
            })
            .map((val: IOption) => {
              const { label, value } = val
              return (
              <View className={'at-col'} style={{marginBottom: '5px'}} key={value}>
                <AtTag key={value} customStyle={{fontSize: label.length >= 3 ? '18rpx' : '28rpx'}} >
                  {label}
                </AtTag>
              </View>
              )
            })
          }
        </View>
        {
          !show ?
          <AtButton type={'secondary'} onClick={this.open} customStyle={BUTTON_STYLE}>打开</AtButton>
          : null
        }
        {
          show ? 
          <AtCheckbox
            options={this.props.checkboxOption}
            selectedList={checkedList}
            onChange={this.handleChange}
          >
          </AtCheckbox>
          : null
        }
        {
          show ?
          <AtButton type={'secondary'} onClick={this.close} customStyle={BUTTON_STYLE}>收起</AtButton>
          : null 
        }
      </View>
    )
  }

}