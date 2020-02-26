import Taro, { Component, Config } from '@tarojs/taro'
import {View, Button} from '@tarojs/components'
import GRadio from '~components/radio'
import Model from '~components/model'
import List from '~components/linearlist'
import Comment from '~components/comment'
import GColor from './components/color'
import { TypeColor, colorChange, dateTypeList } from '~theme/global-style'
import { router, styleChange, routeAlias } from '~utils'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { Toast } from '~components/toast'
import { Option } from 'taro-ui/@types/radio'
import { getStyle } from '~config'

import './index.scss'

type TOptionType = 'on' | 'off'

interface IOption extends Option<string> {
    value: string
}

type right = 'right'
type warn = 'warn'
type primary = 'primary'
const arrow: right = 'right'
const warn: warn = 'warn'
const primary: primary = 'primary'

const ICON_COLOR = 'primary'

const colorControl = {
    on: 'on',
    off: 'off'
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Setting extends Component<any>{
    public static config: Config = {
        navigationBarTitleText: '设置'
    }

    public commentRef = Taro.createRef<Comment>()

    public radioRef = Taro.createRef<GRadio>()

    public colorRef = Taro.createRef<GColor>()

    //用户id
    readonly id = this.props.id

    public componentDidMount = () => {
        const { colorStyle } = this.props
        const storage = getStyle()
        this.setState({
            colorStyle: storage ? storage : colorStyle
        })
    }

    /**
     * 显示小程序信息
     */
    public showAbout = async () => {
        const { about } = this.state
        about.model.isOpen = true
        Taro.showLoading({mask: true, title: '稍等...'})
        await this.props.getAppInfo()
        Taro.hideLoading()
        about.model.content = this.props.appInfo.about || ''
        await this.setState({
            about,
            activeModel: about.model
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
        Toast({
            title: '好了',
            icon: 'success'
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
        const {about} = this.state
        about.model.isOpen = false
        this.setState({
            about
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

    //反馈信息发送
    public handleFeedback = async (value: string) => {
        Taro.showLoading({mask: true, title: '提交中'})
        await this.props.feedback(this.props.id, value)
        Taro.hideLoading()
    }

    //反馈
    readonly feedback = {
        id: Symbol('feedback'),
        title: '反馈',
        disabled: false,
        note: '',
        arrow: arrow,
        iconInfo: {
            value: 'bell',
            size: 16, 
            color: TypeColor[ICON_COLOR]
        },
        handle: this.showFeedback,
        feedback: this.handleFeedback
    }

    //色调
    readonly colorStyle:Array<IOption> = [
        {
            value: colorControl.on,
            label: '开启色调'
        },
        {
            value: colorControl.off,
            label: '关闭色调',
        }
    ]

    //控制色调开启关闭
    public colorStyleChange = async (value: TOptionType) => {
        this.radioRef.current!.handleClick(value)
        let status
        if(value === colorControl.on) {
            status = false
            const date = styleChange()
            if(date) {
                colorChange(dateTypeList.day)
            }else {
                colorChange(dateTypeList.night)
            } 
        }else if(value === colorControl.off) {
            const data = this.colorRef.current!.state.active
            colorChange(false, data)
            status = data
        }
        this.setState({
            colorStyle: status
        })
    }

    //颜色选择 
    public colorSelect = async (value) => {
        this.colorRef.current!.handleClick(value)
        colorChange(false, value)
        this.setState({})
    }

    public state: any = {
        //关于
        about: {
            id: Symbol('about'),
            title: '关于我们',
            disabled: false,
            note: '',
            arrow: arrow,
            iconInfo: {
                value: 'tag',
                size: 16, 
                color: TypeColor[ICON_COLOR]
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
        //登录
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
        activeModel: {},
        colorStyle: getStyle(),
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
            router.push(routeAlias.login)
        }
    }

    /**
     * 模态框状态关闭
     */
    // public modelClose = (info:object={}, name:string) => {
    //     const {button} = this.state
    //     button.model.isOpen = false
    //     this.setState({
    //         button
    //     })
    // }

    public render() {

        const {button, activeModel, about, colorStyle: color } = this.state
        const {
            type,
            value,
            index
        } = button
        const { iconInfo: feedbackInconInfo } = this.feedback
        const { iconInfo: aboutInconInfo } = about

        return (
            <View className='setting'>
                <View className='list'>
                    <List list={[
                        {...this.feedback, iconInfo: { ...feedbackInconInfo, color: TypeColor[ICON_COLOR] }},
                        {...about, iconInfo: { ...aboutInconInfo, color: TypeColor[ICON_COLOR] }}
                    ]} />
                    <GRadio
                        style={{marginTop: '48px'}}
                        extraFactor={false}
                        needHiddenList={false}
                        ref={this.radioRef}
                        radioboxOption={this.colorStyle}
                        active={this.colorStyle[color ? 1 : 0]['value']}
                        handleClick={this.colorStyleChange}
                    ></GRadio>
                    <GColor
                        ref={this.colorRef}
                        style={{height: '48px', visibility: color ? 'visible' : 'hidden' }}
                        handleClick={this.colorSelect}
                    ></GColor>
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
                <Comment 
                    buttonText={'发送'} 
                    ref={this.commentRef}  
                    publishCom={this.feedback.feedback}
                />
            </View>
        )
    }
}