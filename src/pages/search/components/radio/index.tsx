import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtRadio } from 'taro-ui'
import './index.scss'

interface Screen {
    (value: string): void
}

interface IProps {
    screen: Screen
}

interface List {
    label: string,
    value: string,
    id: string
}

interface IState {
    value: string,
    text: string,
    show: boolean,
    list: Array<List>
}

export default class RadioList extends Component<IProps>{
    public static defaultProps = {
        screen: () => {}
    }

    public state:IState = {
        value: '综合',
        text: '综合',
        show: false,
        list: [
            { label: '综合', value: '综合', id: '0'},
            { label: '点赞', value: '点赞', id: '1' },
            { label: '价格升序', value: '价格升序', id: '2'},
            { label: '价格降序', value: '价格降序', id: '3'},
            { label: '播放量', value: '播放量', id: '4'}
            ]
    }

    public constructor() {
        super(...arguments)
        this.handleChange = this.handleChange.bind(this)
        this.showList = this.showList.bind(this)
    } 

    /**
     * 条件选择
     */
    public handleChange (value) {
        const {show} = this.state
        this.setState({
            value,
            text: value,
            show: !show
        })
        console.log(`条件选择${value}`)
        this.props.screen(value)
    }

    /**
     * 列表显示控制
     */
    public showList() {
        const {show} = this.state
        this.setState({
            show: !show
        })
    }

    public render() {
        const { text, show, list, value } = this.state
        return (
            <View className='radio'>
                <Text className='select'
                    onClick={this.showList}
                >
                    {text}
                </Text>
                <View className='list'
                    style={{height: show ? '400px' : '0'}}>
                    <AtRadio
                        options={list}
                        value={value}
                        onClick={this.handleChange}
                    />
                </View>
            </View>
        )
    }
}