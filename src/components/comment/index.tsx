import Taro, { Component } from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import MediaPicker from '../mediaPicker'
import { IItem } from '../mediaPicker/index.d'
import { IMAGE_CONFIG } from '~config'
import { AtTextarea } from "taro-ui"
import { IProps, IState } from './index.d'
import style from '~theme/style'
import { mediaType } from '~utils'
import Curtain from '../curtain'

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
    public close = async (complete:boolean=false) => {
        if(!complete){
            const data = this.mediaPickerRef.current!.state!.isVideo
            if(data) return this.mediaPickerRef.current!.videoClose()
            await Taro.showModal({
                title: '温馨提示',
                content: '你填写的内容还没有提交，是否关闭',
            }).then(res => {
                const { confirm } = res
                if(!confirm) return
                this.reset()
            })
        }else {
            this.reset()
        }
    }

    /**
     * 监听数据改变
     */
    public handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    //阻止手指滑动
    public handleStopMove = (e) => {
        e.stopPropagation()
    }   

    //重置
    public reset = () => {
        this.setState({
            isOpen: false,
            value: '说点什么吧...'
        })
        this.mediaPickerRef.current!.reset()
    }

    /**
     * 发布评论
     */
    public publish = async () => {
        const { value } = this.state
        const data = await this.mediaPickerRef.current!.getData(false)
        this.close(true)
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
            <Curtain
                isOpen={isOpen}
                title={false}
                main={true}
                action={true}
                other={true}
                handleClose={() => {this.close.call(this)}}
                cancel={false}
                contentStyle={{width: '300px'}}
                renderMain={
                    <View className='main'>
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
                            close={false}
                        ></MediaPicker>
                    </View>
                }
                renderAction={
                    <Button
                        className='action'
                        onClick={this.publish}
                        style={{...style.backgroundColor('disabled'), ...style.color('primary')}}
                    >
                        {buttonText}
                    </Button>
                }
            ></Curtain>
        )
    }
}