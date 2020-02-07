import Taro, { Component, Config } from '@tarojs/taro'
import {View, Button} from '@tarojs/components'
import Model from '~components/model'
import List from '~components/linearlist'
import Comment from '~components/comment'
import './index.scss'

import {router} from '~utils'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

type right = 'right'
type warn = 'warn'
type primary = 'primary'
const arrow: right = 'right'
const warn: warn = 'warn'
const primary: primary = 'primary'

@connect(mapStateToProps, mapDispatchToProps)
export default class Setting extends Component<any>{
    public static config: Config = {
        navigationBarTitleText: '设置'
    }

    public commentRef = Taro.createRef<Comment>()

    //用户id
    readonly id = this.props.id

    /**
     * 显示小程序信息
     */
    public showAbout = async () => {
        const {info} = this.state
        info.about.model.isOpen = true
        Taro.showLoading({mask: true, title: '稍等...'})
        await this.props.getAppInfo()
        Taro.hideLoading()
        info.about.model.content = this.props.appInfo.about || '1234444'
        await this.setState({
            info,
            activeModel: info.about.model
        })
    }

    /**
     * 监听退出登录确认
     */
    public logConfirm = async () => {
        this.logClose()
        const {button} = this.state
        var {index} = button
        index ++
        index %= 2
        button.index = index
        this.setState({
            button
        })
        Taro.showLoading({mask: true, title: '稍等一下'})
        await this.props.logout(this.id)
        Taro.hideLoading()
        Taro.showToast({
            title: '好了',
            icon: 'success',
            duration: 1000 
        })
    }

    /**
     * 显示反馈组件
     */
    public showFeedback = async () => {
        await this.props.getUserInfo()
        this.commentRef.current!.open()
        
    }

     /**
     * 监听关于信息退出
     */
    public aboutClose = () => {
        const {info} = this.state
        info.about.model.isOpen = false
        this.setState({
            info
        })
    }

    /**
     * 监听关于信息确认
     */
    public aboutConfirm = () => {
        this.aboutClose()
    }

     /**
     * 监听退出登录状态退出
     */
    public logClose = () => {
        const {button} = this.state
        button.model.isOpen = false
        this.setState({
            button
        })
    }

    /**
     * 监听退出登录取消
     */
    public logCancel = () => {
        this.logClose()
    }

    public state: any = {
        info: {
            about: {
                id: 'about',
                title: '关于我们',
                disabled: false,
                note: '',
                arrow: arrow,
                iconInfo: {
                    value: 'tag',
                    size: 16, 
                    color: '#000'
                },
                handle: this.showAbout,
                model: {
                    isOpen: false,
                    title: '关于小程序',
                    cancelText: '',
                    confirmText: '知道了',
                    onClose: this.aboutClose,
                    onConfirm: this.aboutConfirm,
                    content: '这里是关于小程序的相关信息'
                }
            },
            feedback: {
                id: 'feedback',
                title: '反馈',
                disabled: false,
                note: '',
                arrow: arrow,
                iconInfo: {
                    value: 'bell',
                    size: 16, 
                    color: '#000'
                },
                handle: this.showFeedback
            }
        },
        button: {
            type:[warn, primary],
            value: ['退出登录', '账号登录'],
            index: this.id ? 0 : 1,
            model: {
                isOpen: false,
                title: '提示',
                cancelText: '取消',
                confirmText: '是的',
                onClose: this.logClose,
                onCancel: this.logCancel,
                onConfirm: this.logConfirm,
                content: '亲! 确认要退出吗?'
            }
        },
        activeModel: {}
    }

    /**
     * 退出登录
     */
    public handleButton = async (index: number) => {
        //退出登录
        if(index == 0) {
            const {button} = this.state
            button.model.isOpen = true
            this.setState({
                button,
                activeModel: button.model
            })
            Taro.showLoading({mask: true, title: '稍等一下...'})
            await this.props.logout(this.id)
            Taro.hideLoading()
        }else {
            router.push('/login')
        }
    }

    /**
     * 模态框状态关闭
     */
    public modelClose = (info:object={}, name:string) => {
        const {button} = this.state
        button.model.isOpen = false
        this.setState({
            button
        })
    }

    public render() {
        const {button, info, activeModel} = this.state
        const {
            type,
            value,
            index
        } = button
        return (
            <View className='setting'>
                <View className='list'>
                    <List list={Object.values(info)} />
                </View>
                <View className='button'>
                    <Button 
                        type={type[index]}  
                        plain={true} 
                        onClick={this.handleButton.bind(this, index)} 
                    >
                        {value[index]}
                    </Button>
                </View>
                <Model info={activeModel}/>
                <Comment buttonText={'发送'} ref={this.commentRef}  />
            </View>
        )
    }
}