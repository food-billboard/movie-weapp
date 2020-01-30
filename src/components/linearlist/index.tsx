import Taro, {Component, Config} from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import './index.scss'

type up = 'up'
type right = 'right'
type down = 'down'
type undefined = undefined

interface IconInfo {
    value: string, 
    size?: string | number, 
    color?: string, 
    prefixClass?: string,
    className?: string,
    customStyle?: string
}

interface IList {
    title: string,
    disabled?: boolean,
    note?: string,
    arrow?: up | down | right | undefined,
    iconInfo: IconInfo,
    handle?: any,
    id: string
}   

interface IProps {
    list: Array<IList>
}

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