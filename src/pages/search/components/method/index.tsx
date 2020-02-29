import Taro, {Component} from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import icon from '../../../../assets/icon.png'
import list from '../../../../assets/list.png'
import { IProps, IState } from './index.d'

import './index.scss'

export default class Methods extends Component<IProps, IState>{
    public static defaultProps = {
        screen: () => {}
    }

    public state: IState = {
        change: [0, 1],
        index: 0,
        active: 0
    }

    /**
     * 状态改变
     */
    public change = () => {
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
                <Image className='active' style={{width:'20px', height: '20px'}} src={this.state.active ? list : icon}></Image>
            </View>
        )
    }
}