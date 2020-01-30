import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'

import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToProps } from './connect'

import {router} from '~utils'

import './index.scss'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
    public static config: Config = {
        navigationBarTitleText: '登录'
    }

    public state = {
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
    public handleUser(value, event) {
        this.setState({
            username: value
        })
    }

    /**
     * 监听密码输入
     */
    public handlePass(value, event) {
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
        if(username == '' || password == '') {
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
        await this.props.sendUserLogon(formData);
        await Taro.hideLoading()
        await Taro.showToast({title: '登陆成功', icon: 'success', duration: 1000});
        const { target }: any = this.$router.params
        if( target ) return router.replace(target);
        router.replace('/mine')
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
                    placeholder='输入手机号'
                    value={this.state.username}
                    onChange={this.handleUser.bind(this)}
                />
                    <AtInput
                        name='password'
                        title='密码'
                        type='password'
                        placeholder='密码不能少于10位数'
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