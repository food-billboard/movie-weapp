import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import Time from './components/time'
import './index.scss'

import {router} from '~utils'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { connect } from '@tarojs/redux'

interface IState {
    username: string
    password: string
    phone: string
    check: string
}

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{
    public static config: Config = {
        navigationBarTitleText: '注册'
    }

    public state: IState = {
        username: '',
        password: '',
        phone: '',
        check: ''
    }

    public constructor() {
        super(...arguments)

        this.handleUser = this.handleUser.bind(this)
        this.handlePass = this.handlePass.bind(this)
        this.handlePhone = this.handlePhone.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.submit = this.submit.bind(this)
        this.reset = this.reset.bind(this)
        this.getData = this.getData.bind(this)
    }

    /**
     * 监听用户名输入
     */
    public handleUser(value, event) {
        this.setState({
            username: value
        })
    }

    /**
     * 监听密码输入
     */
    public handlePass(value, event) {
        const {type} = event
        if(type == 'blur' && value.length < 6) {
            Taro.showModal({
                title: '修改失败',
                content: '密码长度不能低于6',
                showCancel: false
            }).then(res => {
                this.setState({
                    password: ''
                })
            })
        }else {
            this.setState({
                password: value
            })
        }
    }

    /**
     * 监听手机号输入
     */
    public handlePhone(value) {
        this.setState({
            phone: value
        })
    }

    /**
     * 监听验证码输入
     */
    public handleCheck(value) {
        this.setState({
            check: value
        })
    }

    /**
     * 信息提交
     */
    public submit = async (e) => {
        const {username, password, phone, check} = this.state
        if(username.length < 4 || password.length < 6 || !/^\d{6}$/g.test(check)) {
            Taro.showToast({
                title: '请输入用户名和密码',
                icon: 'none',
                duration:1000
            })
            return
        }
        Taro.showLoading({mask: true, title: '正在验证...'})
        const data = await this.props.sendNewUser({username, password, phone, code: check})
        Taro.hideLoading()
        const { success, err } = data
        let info = { title: '', icon: '' }
        if(success) {
            info = { title: '注册成功', icon: 'success' }
        }else {
            info = { title: err, icon: 'none' }
        }
        Taro.showToast({
            ...info,
            duration: 2000
        })
        if(success) router.replace('/login', { password, username })
    }

    /**
     * 重置
     */
    public reset() {
        Taro.showModal({
            title: '温馨提示',
            content: '您选择了重置，是否确认清空当前页面所有输入的信息',
            showCancel: true,
            cancelText: '后悔了',
            cancelColor: '#f00',
            confirmText: '没错',
            confirmColor: '#000'
        }).then(res => {
            if(res.cancel) {
                return
            }
            this.setState({
                username: '',
                phone: '',
                password: '',
                check: ''
            })
        })
    }

    /**
     * 获取验证码
     */
    public getData = async () => {
        const {phone} = this.state
        await Taro.showLoading({ mask: true, title: '加载中' });
        await this.props.sendSMS(phone)
        await Taro.hideLoading()
    }

    public render() {
        const { phone } = this.state
        return (
            <View className='register'>
                <AtForm
                    onSubmit={this.submit}
                    onReset={this.reset}
                >
                <AtInput
                    name='username'
                    title='用户名'
                    type='text'
                    placeholder='想个名字吧'
                    value={this.state.username}
                    onChange={this.handleUser}
                />
                <AtInput
                    name='username'
                    title='手机号'
                    type='phone'
                    placeholder='手机号码'
                    value={this.state.phone}
                    onChange={this.handlePhone}
                />
                    <AtInput
                        name='password'
                        title='密码'
                        type='password'
                        placeholder='密码不能少于10位数'
                        value={this.state.password}
                        onChange={this.handlePass}
                    />
                    <AtInput
                        clear
                        name='check'
                        title=''
                        type='number'
                        maxLength='6'
                        placeholder='验证码'
                        value={this.state.check}
                        onChange={this.handleCheck}
                        >
                            <Time 
                                getData={this.getData} 
                                phone={phone}    
                            />
                    </AtInput>
                    <AtButton 
                        formType='submit' 
                        type={'primary'} 
                        className='submit'
                    >
                        提交
                    </AtButton>
                    <AtButton 
                        formType='reset'
                        type={'primary'}
                    >
                        重置
                    </AtButton>
                </AtForm>
            </View>
        )
    }
}