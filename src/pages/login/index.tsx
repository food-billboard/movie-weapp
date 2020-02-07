import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'

import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToProps } from './connect'

import {router} from '~utils'

import './index.scss'

interface IState {
    username: string
    password: string
}

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
    public static config: Config = {
        navigationBarTitleText: '登录'
    }

    public componentDidMount = async () => {
        const { password, username } = this.$router.params
        if(password.length && username.length) {
            this.setState({
                password,
                username
            })
            return
        }
        await this.props.getUserInfo()
    }

    public state: IState = {
        username: '',
        password: '',
        // check: ''
    }

    public constructor() {
        super(...arguments)

        this.handleUser = this.handleUser.bind(this)
        this.handlePass = this.handlePass.bind(this)
        // this.handleCheck = this.handleCheck.bind(this)
        this.submit = this.submit.bind(this)
        this.register = this.register.bind(this)
    }

    /**
     * 监听用户名输入
     */
    public handleUser = (value: string, event) => {
        this.setState({
            username: value
        })
    }

    /**
     * 监听密码输入
     */
    public handlePass = (value, event) => {
        this.setState({
            password: value
        })
    }

    /**
     * 监听验证码输入
     */
    // handleCheck(event, value) {
    //     console.log(value)
    // }

    /**
     * 信息提交
     */
    public submit = async (e) => {
        const {username, password} = this.state
        if(!username.length || !password.length) {
            Taro.showToast({
                title: '请输入用户名和密码',
                icon: 'none',
                duration:1000
            })
            return
        }

        const formData = {
            username,
            password
        }
        await Taro.showLoading({ mask: true, title: '加载中' })
        const userInfo = await this.props.sendUserLogon(formData);
        await Taro.hideLoading()
        const { success } = userInfo
        if(success) {
            await Taro.showToast({title: '登陆成功', icon: 'success', duration: 1000});
        }else {
            await Taro.showToast({title: '账号或密码错误', icon: 'none', duration: 1000});
            this.setState({
                username: '',
                passwrod: ''
            })
            return
        }
        const { target }: any = this.$router.params
        if( target ) return router.replace(target);
        Taro.switchTab({url: '/main'})
        // router.replace('/main')
    }

    /**
     * 注册
     */
    public register() {
        router.push('/register')
    }

    public render() {
        return (
            <View className='login'>
                <AtForm
                    onSubmit={this.submit}
                >
                <AtInput
                    name='username'
                    title='用户名'
                    type='text'
                    placeholder='用户名或账号'
                    value={this.state.username}
                    onChange={this.handleUser.bind(this)}
                />
                    <AtInput
                        name='password'
                        title='密码'
                        type='password'
                        placeholder='请输入密码'
                        value={this.state.password}
                        onChange={this.handlePass.bind(this)}
                    />
                    {/* <AtInput
                        clear
                        name='check'
                        title=''
                        type='text'
                        maxLength='4'
                        placeholder='验证码'
                        value={this.state.check}
                        onChange={this.handleCheck.bind(this)}
                        >
                    </AtInput> */}
                    <AtButton 
                        formType='submit' 
                        type={'primary'} 
                        className='submit'
                    >
                        提交
                    </AtButton>
                    <AtButton 
                        onClick={this.register}
                        type={'secondary'}
                    >
                        注册
                    </AtButton>
                </AtForm>
            </View>
        )
    }
}