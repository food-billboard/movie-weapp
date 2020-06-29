import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { router, routeAlias } from '~utils'
import { Toast } from '~components/toast'

import './index.scss'

interface IState {
    mobile: string
    password: string
}

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
    public static config: Config = {
        navigationBarTitleText: '登录'
    }

    public componentDidMount = async () => {
        const { password='', username='' } = this.$router.params
        if(password.length && username.length) {
            this.setState({
                password,
                username
            })
            return
        }
        await this.props.getUserInfo()
    }

    public componentDidShow = () => {
        colorStyleChange()
    }

    public state: IState = {
        mobile: '',
        password: '',
        // check: ''
    }

    /**
     * 监听用户名输入
     */
    public handleUser = (value: string, _) => {
        this.setState({
            mobile: value
        })
    }

    /**
     * 监听密码输入
     */
    public handlePass = (value: string, _) => {
        this.setState({
            password: value
        })
    }

    /**
     * 信息提交
     */
    public submit = async (_) => {
        const { mobile, password } = this.state

        if(!/^1[345678][0-9]{9}$/.test(mobile) || !password.length || password.length < 6) {
            Toast({
                title: '请输入用户名和密码',
                icon: 'fail'
            })
            return
        }

        const formData = {
            mobile,
            password
        }
        await Taro.showLoading({ mask: true, title: '加载中' })
        const userInfo = await this.props.signin(formData)
        await Taro.hideLoading()
        if(userInfo) return
        //回到上一路由
        const { target }: any = this.$router.params
        if( target ) return router.replace(target)
        Taro.switchTab({url: '../main/index'})
    }

    /**
     * 注册
     */
    public register = () => {
        router.push(routeAlias.register)
    }

    public render() {

        const { mobile, password } = this.state

        return (
            <View className='login' style={{...style.backgroundColor('bgColor')}}>
                <AtForm
                    onSubmit={this.submit}
                >
                <AtInput
                    name='mobile'
                    title='手机号'
                    type='text'
                    placeholder='手机号'
                    value={mobile}
                    onChange={this.handleUser.bind(this)}
                />
                    <AtInput
                        name='password'
                        title='密码'
                        type='password'
                        placeholder='请输入密码'
                        value={password}
                        onChange={this.handlePass.bind(this)}
                    />
                    <AtButton 
                        formType='submit' 
                        type={'primary'} 
                        className='submit'
                        customStyle={{...style.border(1, 'primary', 'solid', 'all'), ...style.backgroundColor('primary')}}
                    >
                        提交
                    </AtButton>
                    <AtButton 
                        onClick={this.register}
                        type={'secondary'}
                        customStyle={{...style.color('primary'), ...style.border(1, 'primary', 'solid', 'all')}}
                    >
                        注册
                    </AtButton>
                </AtForm>
            </View>
        )
    }
}