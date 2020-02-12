import Taro, { Component } from '@tarojs/taro'
import { Button, View, Image } from '@tarojs/components'
import { findIndex } from 'lodash'
import './index.scss'

import { AtModal, AtModalContent, AtModalAction, AtTextarea, AtButton, AtIcon } from "taro-ui"
import { Toast } from '~components/toast'

interface IProps {
    buttonText: string,
    publishCom: (value: any) => any
}

interface IState {
    value: string
    isOpen: boolean
    images: Array<string>
}

export const IMAGE_CONFIG = {
    count: 6,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera']
}

export default class Comment extends Component<IProps>{
    public static defaultProps: IProps = {
        buttonText: '发送评论',
        publishCom: () => {}
    }

    readonly imageConfig = {
        ...IMAGE_CONFIG,
        success: (res) => {
            const { tempFilePaths } = res
            const { images } = this.state
            const len = images.length + tempFilePaths.length
            const { count } = IMAGE_CONFIG
            let data
            if(len > count) {
                const restLen = count - images.length
                data = [ ...images, ...tempFilePaths.slice(0, restLen) ]
            }else {
                data = [ ...images, ...tempFilePaths ]
            }
            this.setState({
                images: data
            })
            Toast({
                title: '添加成功',
                icon: 'success',
                duration: 1000
            })
        }
    }

    public state: IState = {
        value: '说点什么吧...',
        isOpen: false,
        images: []
    }

    //modal打开
    public open = async () => {
        await this.setState({
            isOpen: true
        })
    }

    public constructor() {
        super(...arguments)
        this.handleChange = this.handleChange.bind(this)
        this.publish = this.publish.bind(this)
    }

    /**
     * 监听数据改变
     */
    public handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    /**
     * 发布评论
     */
    public publish = async () => {
        const { value, isOpen, images } = this.state
        await this.setState({
            isOpen: !isOpen
        })
        //评论发布
        this.props.publishCom({value, images})
    }

    //选择图片
    public handleSelectImg = () => {
        const { images } = this.state
        const { count } = IMAGE_CONFIG
        if(images.length === count) {
            Toast({
                icon: 'fail',
                title: '图片已到上限',
                duration: 1000
            })
            return
        } 
        Taro.chooseImage(this.imageConfig)
    }

    //查看图片
    public prviewImage = () => {
        Taro.previewImage({urls: this.state.images})
    }

    //删除图片
    public deleteImage = (img: string) => {
        const { images } = this.state
        const data = findIndex(images, (o: any) => {
            return o === img
        })
        images.splice(data, 1)
        this.setState({
            images
        })
    }

    public render() {
        const { isOpen, images } = this.state
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
                    <AtButton 
                        onClick={this.handleSelectImg}
                        type={'secondary'}
                        circle
                        customStyle={{width: '100%', height: '30px', padding: 0, lineHeight: '30px', margin: '16px 0'}}
                    >
                        选择图片
                    </AtButton>
                    <View className='at-row at-row--wrap image-list'>
                        {
                            images.map(val => {
                                return (
                                    <View
                                        className='at-col at-col-2'
                                        style={{position:'relative'}} 
                                        key={val}
                                    >
                                        <View
                                            className={'at-icon at-icon-close'} 
                                            onClick={this.deleteImage.bind(this, val)}
                                            style={{position:'absolute', right: '-7px', top: '-6px', color: 'red', padding: '3px'}}
                                        ></View>
                                        <Image 
                                            onClick={this.prviewImage}
                                            src={val} 
                                            style={{width: '35px', height: '35px'}}
                                        ></Image>
                                    </View>
                                )
                            })
                        }
                    </View>
                </AtModalContent>
                <AtModalAction>
                    <Button
                        onClick={this.publish}
                    >
                        {buttonText}
                    </Button>
                </AtModalAction>
            </AtModal>
        )
    }
}