import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtButton } from "taro-ui"
import { IProps } from './interface'
import { style } from '~theme/global-style'

import './index.scss'

export default class Setting extends Component<IProps>{
    public static defaultProps = {
        info: {
            isOpen: false,
            title: '提示',
            cancelText: '算了',
            confirmText: '没错',
            onClose: ():any => {},
            onCancel: ():any => {},
            onConfirm: ():any => {},
            content: '确认信息'
        }
    }  

    public render() {
        const { info } = this.props
        const {
            isOpen,
            title,
            cancelText='',
            confirmText,
            onClose,
            onCancel,
            onConfirm,
            content
        } = info
        return (
            <AtModal
                isOpened={isOpen}
                onCancel={onCancel}
            >
                <AtModalHeader><Text style={{...style.color('primary')}}>{title}</Text></AtModalHeader>
                <AtModalContent>
                    {content}
                </AtModalContent>
                <AtModalAction>
                    <View className='at-row'>

                        {
                            cancelText.length ?
                            <View className='at-col'><AtButton customStyle={{border: 'none', ...style.color('primary')}} onClick={onClose}>{cancelText}</AtButton></View> 
                            : null
                        }
                        <View className='at-col'><AtButton customStyle={{border: 'none', ...style.color('primary')}} onClick={onConfirm}>{confirmText}</AtButton></View> 
                    </View>
                </AtModalAction>
            </AtModal>
        )
    }

}