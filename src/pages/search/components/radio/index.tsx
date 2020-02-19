import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtRadio } from 'taro-ui'
import { style } from '~theme/global-style'
import './index.scss'
import { IProps, IState, List } from './interface'

export default class RadioList extends Component<IProps>{
    public static defaultProps = {
        screen: () => {}
    }

    public state:IState = {
        value: '综合',
        text: '综合',
        show: false
    }

    readonly list: Array<List> = [
        { label: '综合', value: '综合', id: '0'},
        { label: '点赞', value: '点赞', id: '1' },
        { label: '价格升序', value: '价格升序', id: '2'},
        { label: '价格降序', value: '价格降序', id: '3'},
        { label: '播放量', value: '播放量', id: '4'}
    ]

    /**
     * 条件选择
     */
    public handleChange = (target: string) => {
        const { show } = this.state
        this.setState({
            value: target,
            text: target,
            show: !show
        })
        const query = this.list.filter(val => {
            const { value } = val
            return value === target
        })
        const { id } = query[0]
        this.props.screen(id)
    }

    /**
     * 列表显示控制
     */
    public showList = () => {
        const {show} = this.state
        this.setState({
            show: !show
        })
    }

    //关闭表单
    public handleClose = () => {
        this.setState({
            show: false
        })
    }

    public render() {
        const { text, show, value } = this.state
        return (
            <View className='radio'>
                <Text className='select'
                    onClick={this.showList}
                >
                    {text}
                </Text>
                <View className='list'
                    style={{height: show ? '270px' : '0', visibility: show ? 'visible' : 'hidden', ...style.backgroundColor('disabled')}}>
                    <AtRadio
                        options={this.list}
                        value={value}
                        onClick={this.handleChange}
                    />
                </View>
                <View className='curtain' style={{display: show ? 'block' : 'none'}} onClick={this.handleClose}></View>
            </View>
            // <View className='radio'>
            //     <Text className='select'
            //         onClick={this.showList}
            //     >
            //         {text}
            //     </Text>
            //     <View className='list'
            //         style={{height: show ? '270px' : '0', visibility: show ? 'visible' : 'hidden', ...style.backgroundColor('disabled')}}>
            //         <AtRadio
            //             options={this.list}
            //             value={value}
            //             onClick={this.handleChange}
            //         />
            //     </View>
            // </View>
        )
    }
}