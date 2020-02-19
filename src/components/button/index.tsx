import { AtButton } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { IProps, IState } from './interface'
import { style } from '~theme/global-style'

export default class Button extends Component<IProps, IState>{
    public static defaultProps:IProps = {
        value: ['是', '不是'],
        active: 0,
        type: 'primary',
        operate: () => {},
        style: {}
    }

    public componentWillReceiveProps(props) {
        this.setState({
            active: props.active
        })
    }

    public state: IState = {
        active: this.props.active,
    }

    /**
     * 按钮模式切换
     */
    public modeChange = () => {
        const { active } = this.state
        let a = active
        a ++ 
        a %= 2
        this.props.operate && this.props.operate()
        this.setState({
            active: a
        })
    }

    public render() {
        const { type, style: customStyle } = this.props
        return (
            <View style={customStyle}>
                <AtButton
                    customStyle={{...style.border(1, 'primary', 'solid', 'all'), ...style.color('primary')}}
                    type={type}
                    circle={true}
                    onClick={this.modeChange}
                    size='normal'
                >{this.props.value[this.state.active]}</AtButton>
            </View>
        )
    }
}
