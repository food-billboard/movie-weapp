import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtRate } from 'taro-ui'
import './index.scss'

interface IProps {
    value: number,
    sendRate: any
}

interface IState {
    value: number
}

let FIRST = true

export default class GTate extends Component<IProps>{
    public static defaultProps = {
        value: 0,
        sendRate: () => {}
    }

    public state: IState = {
        value: this.props.value
    }

    public constructor() {
        super(...arguments)
        this.handleChange = this.handleChange.bind(this)
    }

    // public componentWillReceiveProps(props) {
        // if(!FIRST) return  
        // console.log(props.value) 
        // this.setState({
        //     value: props.value
        // })
        // FIRST = false
    // }

    public componentWillReceiveProps = (props) => {
        // console.log(props.value)
    }

    /**
     * 监听分数变化
     */
    public handleChange = async (value: number) => {
        await this.setState({
            value
        })
        await this.props.sendRate(value)
    }

    public render() {
        const {value} = this.state
        return (
            <View className='rate'>
                <AtRate
                    className='star'
                    size={25}
                    max={10}
                    value={value}
                    onChange={(value) => {this.handleChange.call(this, value)}}
                /> 
                <Text className='number'>{value}</Text>
            </View>
        )
    }
}