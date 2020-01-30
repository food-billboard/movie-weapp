import Taro, {Component} from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

interface Screen {
    (value: string): void
}

interface IProps {
    screen: Screen
}

interface IState {
    change: Array<number>,
    index: number,
    active: number
}

export default class Methods extends Component<any>{
    public static defaultProps = {
        screen: () => {}
    }

    public state = {
        change: [0, 1],
        index: 0,
        active: 0
    }

    public constructor() {
        super(...arguments)
        this.change = this.change.bind(this)
    }

    /**
     * 状态改变
     */
    public change() {
        const {index, change} = this.state
        var i = index
        i ++
        i %= 2
        this.setState({
            active: change[i],
            index: i
        })
        this.props.screen()
    }

    public render() {
        return (
            <View className='method'
                onClick={this.change}>
                <Image src={this.state.active ? '' : ''}></Image>
            </View>
        )
    }
}