import Taro, { Component } from '@tarojs/taro'
import { Button } from '@tarojs/components'
import GImagePicker from '../imgPicker'
import { IMAGE_CONFIG } from '~config'
import { AtModal, AtModalContent, AtModalAction, AtTextarea } from "taro-ui"

import { IProps, IState } from './interface'
import { style } from '~theme/global-style'

export default class Comment extends Component<IProps>{
    public static defaultProps: IProps = {
        buttonText: '发送评论',
        publishCom: () => {}
    }

    readonly imgPickerRef = Taro.createRef<GImagePicker>()

    //图片提交的配置
    readonly imageConfig = {
        ...IMAGE_CONFIG,
    }

    public state: IState = {
        value: '说点什么吧...',
        isOpen: false
    }

    //modal打开
    public open = async () => {
        await this.setState({
            isOpen: true
        })
    }

    /**
     * 监听数据改变
     */
    public handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    /**
     * 发布评论
     */
    public publish = async () => {
        const { value, isOpen } = this.state
        const {files}  = this.imgPickerRef.current!.state
        await this.setState({
            isOpen: !isOpen
        })
        //评论发布
        this.props.publishCom({value, images: files})
    }

    public render() {
        const { isOpen } = this.state
        const { buttonText } = this.props
        return (
            <AtModal 
                isOpened={isOpen}
                onClose={() => {this.setState({isOpen: false})}}
            >
                <AtModalContent>
                    <AtTextarea 
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                        maxLength={250}
                        height={280}
                        placeholder='说点什么吧...'
                    />
                    <GImagePicker
                        ref={this.imgPickerRef}
                        length={6}
                    ></GImagePicker>
                </AtModalContent>
                <AtModalAction>
                    <Button
                        onClick={this.publish}
                        style={{...style.backgroundColor('disabled'), ...style.color('primary')}}
                    >
                        {buttonText}
                    </Button>
                </AtModalAction>
            </AtModal>
        )
    }
}