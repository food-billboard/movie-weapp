import Taro, { Component } from '@tarojs/taro'
import { Block, View } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import GPicker from '~components/picker'
import { TypeColor } from '~theme/color'
import { IProps, IState } from './index.d'

const TAT_STYLE = {
  boxSizing: 'border-box', 
  border: `1px dashed ${TypeColor['primary']}`, 
  width:'100%', 
  marginBottom: '5px', 
  color: TypeColor['primary']
}

export default class extends Component<IProps, IState> {

  public state: IState = {
    
  }

  public render() {

    const tagStyle = {
      ...TAT_STYLE,
      border: `1px dashed ${TypeColor['primary']}`, 
      color: TypeColor['primary']
    }

    return (
      <Block>
        <AtTag 
          customStyle={tagStyle} 
          type={'primary'}
        >
          时间选择
        </AtTag>
        <View className="at-row">
          <View className="at-col">
            <GPicker
              date={{fields: 'year'}}
              title={'起始时间'}
              style={{marginBottom: '5px'}}
            >
            </GPicker>
          </View>
          <View className='at-col'>
            <GPicker
              date={{fields: 'year'}}
              title={'结束时间'}
              style={{paddingBottom:'20px'}}
            >
            </GPicker>
          </View>
        </View>
      </Block>
    )
  }

}