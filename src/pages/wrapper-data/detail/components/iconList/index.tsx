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

  public state: IState = {
    active: '',
    activeShow: false,
  }

  public timer

  //查看评论
  public handleClick = (value: string) => {
    clearTimeout(this.timer)
    this.setState({
      activeShow: true,
      active: value
    })
    this.timer = setTimeout(() => {
      this.setState({
        activeShow: false
      })
    }, 6000)
  }

  public render() {

    const { list = [] } = this.props
    const { activeShow, active } = this.state
    const showList = list.length > 30 ? list.slice(0, 30) : list

    return (
      <View className='icon-list'>
        <View
          className='icon-list-text-content'
          style={{ visibility: activeShow ? 'visible' : 'hidden', ...style.backgroundColor('thirdly'), ...style.color('disabled') }}
          onClick={() => { this.props.handleClick && this.props.handleClick() }}
        >
          {active}
          <View
            className='list-content-arrow'
            style={{ ...style.border(20, 'primary', 'solid', 'top') }}
          ></View>
        </View>
        <ScrollView
          scrollX
          className='icon-list-content'
          style={{ ...style.border(1, 'disabled', 'dashed', 'all'), boxSizing: 'content-box', boxShadow: '0 0 10rpx rgba(0, 0, 0, 0.12)' }}
        >
          {
            showList.map(val => {
              const { image, content, id } = val
              return (
                <View 
                  key={id}
                  className='icon-list-content-item'
                  onClick={this.handleClick.bind(this, content)}
                >
                  <Imageloading src={image} loadingProps={{ content: '' }} />
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}