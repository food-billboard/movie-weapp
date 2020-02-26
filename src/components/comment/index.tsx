import Taro, { Component } from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import MediaPicker from '../mediaPicker'
import { IItem } from '../mediaPicker/interface'
import { IMAGE_CONFIG } from '~config'
import { AtTextarea } from "taro-ui"
import { IProps, IState } from './interface'
import { style } from '~theme/global-style'
import { mediaType } from '~utils'

import './index.scss'

export default class Comment extends Component<IProps>{
    public static defaultProps: IProps = {
        buttonText: '发送评论',
        publishCom: () => {}
    }

    readonly mediaPickerRef = Taro.createRef<MediaPicker>()

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

    //modal关闭
    public close = () => {
        this.setState({
            isOpen: false,
            value: '说点什么吧...'
        })
        this.mediaPickerRef.current!.reset()
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
        const data = await this.mediaPickerRef.current!.getData(false)
        this.close()
        let image:Array<any> = [],
            video:Array<any> = []
        if(data) {
            data.map((val: IItem) => {
                const { url, type } = val
                if(mediaType[type] === mediaType.image) {
                    image.push({url})
                }else if(mediaType[type] === mediaType.video) {
                    video.push({url})
                }
            })
        }
        //评论发布
        this.props.publishCom({value, images: image, videos: video })
    }

    public render() {
        const { isOpen } = this.state
        const { buttonText } = this.props
        return (
            <View 
                className='comment'
                style={{display: isOpen ? 'block' : 'none'}}
            >
                <View className='shade'></View>
                <View 
                    className='main'
                >
                    <View className='content'>
                        {
                            isOpen ? 
                            <AtTextarea 
                                className='textarea'
                                value={this.state.value}
                                onChange={this.handleChange.bind(this)}
                                maxLength={250}
                                height={280}
                                placeholder='说点什么吧...'
                            />
                            : null
                        }
                        <MediaPicker
                            style={{marginTop:'20px'}}
                            ref={this.mediaPickerRef}
                            height={70}
                        ></MediaPicker>
                    </View>
                    <View className='action'>
                        <Button
                            onClick={this.publish}
                            style={{...style.backgroundColor('disabled'), ...style.color('primary')}}
                        >
                            {buttonText}
                        </Button>
                    </View>
                    <View 
                        className='close at-icon at-icon-close' 
                        style={{...style.color('primary')}}
                        onClick={() => {this.close.call(this)}}
                    ></View>
                </View>
            </View>
        )
    }
}