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

    /**
     * 显示小程序信息
     */
    public showAbout = async () => {
        const {info} = this.state
        info.about.model.isOpen = true
        Taro.showLoading({mask: true, title: '稍等...'})
        await this.props.getAppInfo()
        Taro.hideLoading()
        info.about.model.content = this.props.appInfo.about
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
        const {id} = this.props
        var {index} = button
        index ++
        index %= 2
        button.index = index
        this.setState({
            button
        })
        Taro.showLoading({mask: true, title: '稍等一下'})
        await this.props.logout(id)
        Taro.hideLoading()
        Taro.showToast({
            title: '好了',
            icon: 'success',
            duration: 1000 
        })
    }

    public state = {
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
                handle: this.showFeedback,
                feedOpen: false,
                // model: {
                //     isOpen: false,
                //     title: '',
                //     cancelText: '突然不想发了',
                //     confirmText: '写完了',
                //     onCancel: this.feedbackCancel,
                //     onClose: this.feedbackClose,
                //     onConfirm: this.feedbackConfirm,
                //     content: null,
                //     value: '',
                //     onChange: this.feedbackChange
                // }
            }
        },
        button: {
            type:[warn, primary],
            value: ['退出登录', '账号登录'],
            index: this.props.id.length ? 0 : 1,
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

    public constructor() {
        super(...arguments)
        this.handleButton = this.handleButton.bind(this)
        this.logClose = this.logClose.bind(this)
        this.logCancel = this.logCancel.bind(this)
        this.logConfirm = this.logConfirm.bind(this)
        this.modelClose = this.modelClose.bind(this)
        this.aboutClose = this.aboutClose.bind(this)
        this.aboutConfirm = this.aboutConfirm.bind(this)
        this.showAbout = this.showAbout.bind(this)
        // this.feedbackCancel = this.feedbackCancel.bind(this)
        // this.feedbackClose = this.feedbackClose.bind(this)
        // this.feedbackConfirm = this.feedbackConfirm.bind(this)
        // this.feedbackChange = this.feedbackChange.bind(this)
        this.showFeedback = this.showFeedback.bind(this)
    }

    /**
     * 退出登录
     */
    public handleButton = async (index: number) => {
        //退出登录
        if(index == 0) {
            const {button} = this.state
            const { params } = this.$router
            button.model.isOpen = true
            this.setState({
                button,
                activeModel: button.model
            })
            Taro.showLoading({mask: true, title: '稍等一下...'})
            await this.props.logout(params.id)
            Taro.hideLoading()
        }else {
            router.push('/login')
        }
    }

    /**
     * 模态框状态关闭
     */
    public modelClose(info:object={}, name:string): void {
        const {button} = this.state
        button.model.isOpen = false
        this.setState({
            button
        })
    }

    /**
     * 监听退出登录状态退出
     */
    public logClose(): void {
        const {button} = this.state
        button.model.isOpen = false
        this.setState({
            button
        })
    }

    /**
     * 监听退出登录取消
     */
    public logCancel():void {
        this.logClose()
    }

    /**
     * 监听关于信息退出
     */
    public aboutClose(): void {
        const {info} = this.state
        info.about.model.isOpen = false
        this.setState({
            info
        })
    }

    /**
     * 监听关于信息确认
     */
    public aboutConfirm(): void {
        this.aboutClose()
    }

    /**
     * 显示反馈组件
     */
    public showFeedback():void {
        // const {info} = this.state
        // if(!info.feedback.model.content) {
        //     const com = () => {
        //         return (
        //             <AtTextarea value={info.feedback.model.value} onChange={info.feedback.model.onChange} />
        //         )
        //     }
        //     info.feedback.model.content = Gtextarea({vlaue: info.feedback.model.value, onChange: info.feedback.model.onChange})
        // }
        // info.feedback.model.isOpen = true
        // this.setState({
        //     info,
        //     activeModel: info.feedback.model
        // })

        this.commentRef.current!.open()
        
    }

    /**
     * 监听反馈取消
     */
    // public feedbackCancel(): void {
    //     console.log('反馈取消')
    //     this.feedbackClose()
    // }

    /**
     * 监听反馈关闭
     */
    // public feedbackClose(): void {
    //     console.log('反馈关闭')
    //     const {info} = this.state
    //     info.feedback.model.isOpen = false
    //     this.setState({
    //         button
    //     })
    // }

    /**
     * 监听反馈确认
     */
    // public feedbackConfirm(): void {
    //     const {info} = this.state
    //     const {feedback} = info
    //     const {model} = feedback
    //     const {value} = model
    //     console.log(`反馈确认${value}`)
    //     this.feedbackClose()
    //     Taro.showToast({
    //         title: '好了',
    //         icon: 'success',
    //         duration: 2000 
    //     })
    //     console.log('向后端发送退出登录命令, 需要等待后端返回数据后改变上述条件, 并且弹出发送成功提示')
    // }

    /**
     * 监听反馈输入框数据改变
     */
    // public feedbackChange(event:any): void {
    //     const {info} = this.state
    //     info.feedback.model.value = event.target.value
    //     this.setState({
    //         info
    //     })
    // }

    public render() {
        const {button, info, activeModel} = this.state
        const {
            type,
            value,
            index
        } = button
        const {feedOpen} = info.feedback
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