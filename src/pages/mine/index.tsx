import Taro, {Component, Config} from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import Title from './components/title'
import IconList from './components/icon'
import List from '~components/linearlist'
import IconHead from '~components/headicon'
import { TypeColor, colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { IList } from '~components/linearlist/index.d'
import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { router, routeAlias } from '~utils'
import { getCookie, setCookie } from '~config'

import './index.scss'

type right = 'right'
const arrow:right = 'right'

const ICON_COLOR = 'primary'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{

    public static config: Config = {
        navigationBarTitleText: '我的',
    }

    //设置
    readonly setting: Array<IList> = [
        {
            title: 'Wo的发布',
            disabled: false,
            arrow: arrow,
            iconInfo: {
                value: 'share-2',
                color: TypeColor[ICON_COLOR]
            },
            handle: () => {
                router.push(routeAlias.userissue, { id: this.id })
            },
            id: Symbol('issue')
        },
        {
            title: '设置',
            disabled: false,
            note: '',
            arrow: arrow,
            iconInfo: {
                value: 'settings',
                color: TypeColor[ICON_COLOR]
            },
            handle: () => {
                router.push(routeAlias.setting, { id: this.id })
            },
            id: Symbol('setting')
        }
    ] 

    //用户id
    private id: string

    //是否登录
    private login: boolean = Boolean(this.$router.params.login).valueOf()

    public state: any = {
        detail: {},
        typeColor: TypeColor
    }

    public componentDidMount = async () => {
        if(this.login) await this.fetchData()
    }

    //获取数据
    public fetchData = async () => {
        Taro.showLoading({ mask: true, title: '加载中' })
        const detail = await this.props.getUserInfo()
        const { info } = detail
        Taro.hideLoading()
        await this.setState({
            detail: info
        })
    }

    public componentDidShow = () => {

        //缓存信息查看
        const userInfo = getCookie('user') || {}
        if(!userInfo.id) {
            this.login = false
        }else {
            const { id } = userInfo
            this.id = id
        }

        ////色调修改时重绘
        colorStyleChange(true)
        const { typeColor } = this.state
        if(typeColor == TypeColor) return
        this.setState({typeColor: TypeColor})
    }

    //监听获取用户信息
    public handleGetUserInfo = async (res) => {
        const { userInfo, rawData, signature, encryptedData, iv, cloudID } = res
        console.log(res)

        //在这里向后端请求开发者服务器上的用户数据
        //然后等到后端返回数据后设置数据并且放到storage中(cookie的相关配置到时候再弄)，然后改变登录状态
        // const data = await this.props.sendLogin()
        //setCookit()
        this.setState({
            detail: {}
        }, () => {
            this.login = true
        })
    }

    //登录获取session
    public handleLogin = async () => {
        const data = await new Promise((resovle, reject) => {
            Taro.login({
                success: (res) => {
                    const { code } = res
                    resovle(code)
                },
                fail: () => {
                    reject(false)
                }
            })
        })
        // this.code = data
    }

    public render() {
        const { id, hasNews=false } = this.props
        const { detail } = this.state
        return (
            <View className='mine'>
                <View className='head'>
                    <IconHead
                        list={detail}
                    />
                </View>
                <View className='main'
                    style={{...style.backgroundColor('disabled')}}
                >
                    {
                        this.login ?
                        <View>
                            <View className='title'>
                                <Title 
                                    hasNews={hasNews}
                                    id={id}
                                />
                            </View>
                            <View className='iconlist'>
                                <IconList
                                    id={id}
                                />
                            </View>
                            <View className='list'>
                                <List
                                    list={this.setting.map((val: IList) => {
                                        const { iconInfo } = val
                                        return {
                                            ...val,
                                            iconInfo: {
                                                ...iconInfo,
                                                color: TypeColor[ICON_COLOR]
                                            }
                                        }
                                    })}
                                />
                            </View>
                        </View> :
                        <View className='login'>
                            <AtTag 
                                customStyle={{
                                    ...style.border(1, 'primary', 'solid', 'all')
                                }}
                            >你还没有登录，可以点下面登录</AtTag>
                            <View style={{fontWeight: 'bolder', ...style.color('thirdly')}}>
                                {
                                    [ '|', '|', '|', '|', '|', '|', '|', '↓' ].map((val: string) => (<View>{val}</View>))
                                }
                            </View>
                            <Button 
                                className='button'
                                openType={'getUserInfo'}
                                style={{...style.backgroundColor('secondary')}}
                                onGetUserInfo={this.handleGetUserInfo}
                                onClick={this.handleLogin}
                            >点我登录</Button>
                        </View>
                    }
                </View>
            </View>
        )
    }
}