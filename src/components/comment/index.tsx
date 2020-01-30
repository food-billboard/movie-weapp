import Taro, { Component } from '@tarojs/taro'
import { Button } from '@tarojs/components'
import './index.scss'

import { AtModal, AtModalContent, AtModalAction, AtTextarea } from "taro-ui"

interface IProps {
    buttonText: string,
    isOpen: boolean,
    publishCom: any
}

interface IState {
    value: string,
    isOpen: boolean
}

export default class Comment extends Component<IProps>{
    public static defaultProps: IProps = {
        buttonText: '发送评论',
        isOpen:false,
        publishCom: () => {}
    }

    public state: IState = {
        value: '说点什么吧...',
        isOpen: this.props.isOpen
    }

    public constructor() {
        super(...arguments)
        this.handleChange = this.handleChange.bind(this)
        this.publish = this.publish.bind(this)
    }

    public componentWillReceiveProps(props) {
        this.setState({
            isOpen: props.isOpen
        })
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
        const {value, isOpen} = this.state
        await this.setState({
            isOpen: !isOpen
        })
        //评论发布
        this.props.publishCom(value)
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