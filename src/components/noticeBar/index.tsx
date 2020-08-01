import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Modal from '../model'
import { AtNoticebar } from 'taro-ui'
import { AtNoticeBarProps } from 'taro-ui/@types/noticebar'

export interface IProps extends AtNoticeBarProps {
  text: string
  handleClose?: () => any
  handleMore?: () => any
}

export interface IState {
  show: boolean
  modalShow: boolean
}

export default class extends Component<IProps, IState> {

  //关闭
  public handleClose = () => {

  }

  //查看更多
  public handleMore = () => {
    this.setState({
      modalShow: true
    })
  }

  public state: IState = {
    show: true,
    modalShow: false
  }

  public render() {

    const {
      text,
      moreText = '查看详情',
      close = true,
      single = true,
      marquee = true,
      speed = 100,
      showMore = false,
      icon = 'bell'
    } = this.props

    const { show, modalShow } = this.state

    return (
      <View>
        {
          text ?
            <AtNoticebar
              customStyle={{ visibility: show ? 'visible' : 'hidden' }}
              moreText={moreText}
              close={close}
              single={single}
              marquee={marquee}
              speed={speed}
              showMore={showMore}
              icon={icon}
              onClose={this.props.handleClose ? this.props.handleClose : this.handleClose}
              onGotoMore={this.props.handleMore ? this.props.handleMore : this.handleMore}
            >{text}</AtNoticebar>
            : null
        }
        {
          showMore ?
            <Modal
              info={
                {
                  isOpen: modalShow,
                  title: '跑马灯',
                  cancelText: '',
                  confirmText: '知道了',
                  onClose: () => { this.setState({ modalShow: false }) },
                  onCancel: () => { this.setState({ modalShow: false }) },
                  onConfirm: () => { this.setState({ modalShow: false }) },
                  content: text
                }
              }
            ></Modal>
            : null
        }
      </View>
    )
  }

}