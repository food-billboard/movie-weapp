import Taro, { Component, Config } from '@tarojs/taro'
import { AtModal } from "taro-ui"

import './index.scss'

interface Info {
    isOpen: boolean,
    title: string,
    cancelText?: string,
    confirmText: string,
    onClose?: () => any,
    onCancel?: () => any,
    onConfirm: () => any,
    content: string
}

interface IProps {
    info: Info
}

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
            cancelText,
            confirmText,
            onClose,
            onCancel,
            onConfirm,
            content
        } = info
        return (
            <AtModal
                isOpened={isOpen}
                title={title}
                cancelText={cancelText}
                confirmText={confirmText}
                onClose={ onClose }
                onCancel={ onCancel }
                onConfirm={ onConfirm }
                content={content}
            />
        )
    }

}