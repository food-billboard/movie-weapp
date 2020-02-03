import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import RadioList from '../radio'
import Method from '../method' 
import Select from '../select'

import { FormData } from '../../interface'

import './index.scss'

interface IProps {
    sortScreen: (value: string) => void
    showMethod: () =>void
    queryScreen: (formData: FormData) => void
}

export default class Sub extends Component<IProps>{
    public static defaultProps = {
        simpleScreen: () => {},
        showMethod: () => {},
        queryScreen: (formData: FormData) => {}
    }

    public render() {
        return(
            <View className='at-row at-row__justify--around sub'>
                <View className='at-col at-col-5 select'>
                    <RadioList screen={this.props.sortScreen} />
                </View>
                <View className='at-col at-col-3 look'>
                    <Method
                        screen={this.props.showMethod}
                    />
                </View>
                <View className='at-col at-col-5 screen'>
                    <Select
                        screen={this.props.queryScreen}
                    />
                </View>
            </View>
        )
    }
}