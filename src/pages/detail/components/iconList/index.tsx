import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { ScrollView, View } from '@tarojs/components'
import Imageloading from '~components/imageLoading'
import style from '~theme/style'

import './index.scss'

interface IList {
  image: string
  id: string
  content: string
}

export interface IProps {
  list: Array<IList>
  handleClick?: () => any
}

export interface IState {
  activeShow: boolean
  active: string
}

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    list: [],
  }

  public timer

  public state: IState = {
    active: '',
    activeShow: false,
  }

  //查看评论
  public handleClick = (vlaue: string) => {
    clearTimeout(this.timer)
    this.setState({
      activeShow: true,
      active: vlaue
    })
    this.timer = setTimeout(() => {
      this.setState({
        activeShow: false
      })
    }, 6000)
  }

  public render() {
    
    const { list } = this.props
    const { activeShow, active } = this.state
    const showList = list.length > 30 ? list.slice(0, 30) : list

    return (
      <View className='icon-list'>
        <View 
            className='content' 
            style={{visibility: activeShow ? 'visible' : 'hidden', ...style.backgroundColor('primary'), ...style.color('disabled')}}
            onClick={() => { this.props.handleClick && this.props.handleClick() }}
          >
            {active}
            <View 
              className='arrow'
              style={{...style.border(20, 'primary', 'solid', 'top')}}
            ></View>
          </View>
        <ScrollView
          scrollX={true}
          className='list'
          style={{...style.border(1, 'disabled', 'dashed', 'all')}}
        >
          {
            showList.map(val => {
              const { image, content } = val
              return (
                <View className='icon'
                  onClick={this.handleClick.bind(this, content)}
                >
                  <Imageloading src={image} loadingProps={{content: ''}} />
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}