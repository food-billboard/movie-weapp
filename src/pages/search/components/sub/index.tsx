import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import RadioList from '../radio'
import Method from '../method' 
import Select from '../select'
import './index.scss'

interface SimpleScreen {
    (value: string): void
}

interface ShowMethod {
    (): void
}

interface IProps {
    simpleScreen: SimpleScreen
    showMethod: ShowMethod
}

export default class Sub extends Component<IProps>{
    public static defaultProps = {
        simpleScreen: () => {},
        showMethod: () => {}
    }

    public render() {
        return(
            <View className='at-row at-row__justify--around sub'>
                <View className='at-col at-col-5 select'>
                    <RadioList screen={this.props.simpleScreen} />
                </View>
                <View className='at-col at-col-3 look'>
                    <Method
                        screen={this.props.showMethod}
                    />
                </View>
                <View className='at-col at-col-5 screen'>
                    <Select />
                </View>
            </View>
        )
    }
}