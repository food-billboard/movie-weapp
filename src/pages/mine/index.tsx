import Taro, {Component, Config} from '@tarojs/taro'
import { View } from '@tarojs/components'
import Title from './components/title'
import IconList from './components/icon'
import List from '~components/linearlist'
import IconHead from '~components/headicon'
import { TypeColor, colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { IList } from '~components/linearlist/index.d'

import './index.scss'

import { router, routeAlias } from '~utils'

import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToProps } from './connect'

type right = 'right'
const arrow:right = 'right'

const ICON_COLOR = 'primary'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{

    public static config: Config = {
        navigationBarTitleText: '我的'
    }

    //设置
    readonly setting: Array<IList> = [
        {
            title: 'Wo的发布',
            disabled: false,
            arrow: arrow,
            iconInfo: {
                value: 'share-2',
                size: 14,
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
                size: 14, 
                color: TypeColor[ICON_COLOR]
            },
            handle: () => {
                router.push(routeAlias.setting)
            },
            id: Symbol('setting')
        }
    ] 

    //用户id
    readonly id = this.$router.params.id

    public state: any = {
        detail: {},
        typeColor: TypeColor
    }

    public componentWillMount = () => {
        if(!this.id) {
            // router.replace('/login')
        }
    }

    public componentDidMount = async () => {
        Taro.showLoading({ mask: true, title: '加载中' })
        const detail = await this.props.getUserInfo()
        const { info } = detail
        Taro.hideLoading()
        await this.setState({
            detail: info
        })
    }

    //色调修改时重绘
    public componentDidShow = () => {
        colorStyleChange(true)
        const { typeColor } = this.state
        if(typeColor == TypeColor) return
        this.setState({typeColor: TypeColor})
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
                </View>
            </View>
        )
    }
}