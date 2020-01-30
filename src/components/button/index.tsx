import { AtButton } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

type primary = 'primary'
type secondary = 'secondary'
type undefined = undefined

interface IProps {
    value: Array<string>
    active: number
    type: primary | secondary | undefined
    color: string
    operate: any
    style?: {} | object
}

interface IState {
    active: number,
    mode: string
}

export default class Button extends Component<IProps>{
    public static defaultProps:IProps = {
        value: ['是', '不是'],
        active: 0,
        type: 'primary',
        color:'#000',
        operate: () => {},
        style: {}
    }

    public state: IState = {
        active: 0,
        mode: this.props.value ? this.props.value[0] : ''
    }

    public constructor() {
        super(...arguments)
        this.modeChange = this.modeChange.bind(this)
    }

    /**
     * 按钮模式切换
     */
    public modeChange() {
        const { active } = this.state
        const { value, operate } = this.props
        let a = active
        a ++ 
        a %= 2
        operate()
        this.setState({
            mode: value[a],
            active: a
        })
    }

    public render() {
        const { mode } = this.state
        const { type, style } = this.props
        return (
            <View style={style}>
                <AtButton
                    type={type}
                    circle={true}
                    onClick={this.modeChange}
                    size='normal'
                >{mode}</AtButton>
            </View>
        )
    }
}
