import Taro, { Component } from '@tarojs/taro'
import { Swiper, SwiperItem, View } from '@tarojs/components'
import { TypeColor } from '~theme/color'
import { IProps, IState } from './index.d'
import { emoji } from '~theme/emoji'
import style from '~theme/style'

import './index.scss'

export default class extends Component<IProps, IState> {

  public state: IState = {
    show: false,
    mode: ''
  }

  //判断字符串是否为emoji表情
  public isEmojiCharacter = (substring) => {
    for ( var i = 0; i < substring.length; i++) {
        const hs = substring.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (substring.length > 1) {
                const ls = substring.charCodeAt(i + 1);
                const uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true;
                }
            }
        } else if (substring.length > 1) {
            const ls = substring.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                return true;
            }
        } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
            } else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
            } else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                    || hs == 0x2b50) {
                return true;
            }
        }
    }
    return false
  }

  //表情选择
  public handleClick = (value) => {
    this.setState({
      mode: value
    })
    this.props.handleAddEmoj(value)
  }

  //关闭
  public handleClose = () => {
    this.setState({
      show: false
    })
  }

  //控制显示隐藏
  public controlShowHide = (callback?: (...args: any[]) => any) => {
    const { show } = this.state
    this.setState({
      show: !show
    }, () => {
      callback && callback()
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
              emoji.map((val: any) => {
                const { emoji: page, id } = val
                return (
                  <SwiperItem
                    key={id}
                  >
                    <View className='at-row at-row--wrap'>
                      {
                        page.map((value: any) => {
                          return (
                            <View 
                              className='at-col at-col-1 icon-content'
                              key={value}
                              onClick={() => {this.handleClick.call(this, value)}}
                            >
                              {value}
                            </View>
                          )
                        })
                      }
                      <View 
                        className='at-col at-col-1'
                        style={{...style.color('primary'), marginLeft: '-5px', textAlign: 'center'}}
                        onClick={this.props.handleRemoveEmoj}
                      >
                        <View className='at-icon at-icon-trash' style={{textShadow: `0 0 2px ${TypeColor['bgColor']}`}}></View>
                      </View>
                    </View>
                  </SwiperItem>
                )      
              })
            }
        </Swiper>
    )
  }

}