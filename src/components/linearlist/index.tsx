import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import { IProps } from './interface'

import './index.scss'

export default class List extends Component<IProps>{
    public static defaultProps: IProps = {
        list: []
    }

    public render() {
        const {list} = this.props
        const icon = list.map((value) => {
            const {
                title = '标签',
                disabled = false,
                note = '',
                arrow = 'right',
                iconInfo,
                handle = () => {},
                id
            } = value
            return (
                <AtListItem
                    key={id} 
                    title={title}
                    disabled={disabled} 
                    onClick={handle}
                    note={note}
                    arrow={arrow}
                    iconInfo={iconInfo}
                />
            )
        })
        return(
            <View className='list'>
                <AtList hasBorder={true}>
                    {icon}
                </AtList>
            </View>
        )
    }
}