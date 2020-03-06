import Taro, { Component } from '@tarojs/taro'
import { Swiper, SwiperItem, View } from '@tarojs/components'
import { TypeColor } from '~theme/color'
import { IProps, IState } from './index.d'
import { emoj } from '~theme/emoj'

import './index.scss'
import style from '~theme/style'

export default class extends Component<IProps, IState> {

  public state: IState = {
    show: false,
    mode: ''
  }

  //表情选择
  public handleClick = (value) => {
    this.setState({
      mode: value
    })
    this.props.handleAddEmoj(value)
  }

  //控制显示隐藏
  public controlShowHide = () => {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }

  //获取表情
  public getData = () => {
    const { mode } = this.state
    return mode
  }

  public render() {
    
    const { show } = this.state

    return (
      <Swiper
        style={{
          display: show ? 'block' : 'none',
          ...style.border(1, 'disabled', 'solid', 'all')
        }}
        className='swiper'
        indicatorColor={TypeColor['primary']}
        indicatorActiveColor={TypeColor['disabled']}
        circular={false}
        indicatorDots
        autoplay={false}
        >
            {
              emoj.map((val: any) => {
                const { emoj: page, id } = val
                return (
                  <SwiperItem
                    key={id}
                  >
                    <View className='at-row at-row--wrap'>
                      {
                        page.map((value: any) => {
                          const { value: emojText, id: emojId } = value
                          return (
                            <View 
                              className='at-col at-col-1 icon-content'
                              key={emojId}
                              onClick={() => {this.handleClick.call(this, emojText)}}
                            >
                              {emojText}
                            </View>
                          )
                        })
                      }
                    </View>
                  </SwiperItem>
                )      
              })
            }
        </Swiper>
    )
  }

}