import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtRadio } from 'taro-ui'
import { style } from '~theme/global-style'
import './index.scss'
import { IProps, IState, List, IRadio } from './interface'
import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToProps } from './connect'

@connect(mapStateToProps, mapDispatchToProps)
export default class RadioList extends Component<IProps>{

    public state:IState = {
        value: '综合',
        text: '综合',
        show: false,
        radioList: []
    }

    public componentDidMount = async() => {
        await this.fetchData()
    }

    // readonly list: Array<List> = [
    //     { label: '综合', value: '综合', id: '0'},
    //     { label: '点赞', value: '点赞', id: '1' },
    //     { label: '价格升序', value: '价格升序', id: '2'},
    //     { label: '价格降序', value: '价格降序', id: '3'},
    //     { label: '播放量', value: '播放量', id: '4'}
    // ]

    //数据获取
    public fetchData = async () => {
        Taro.showLoading({mask: true, title: '稍等一下'})
        const data = await this.props.getOrderList()
        const { data:_data } = data
        this.setState({
            radioList: _data.map((val:IRadio) => {
                const { label } = val
                return {
                    ...val,
                    value: label
                }
            })
        })
        Taro.hideLoading()
    }

    /**
     * 条件选择
     */
    public handleChange = (target: string) => {
        const { show, radioList } = this.state
        this.setState({
            value: target,
            text: target,
            show: !show
        })
        const query = radioList.filter((val:List) => {
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
        const { text, show, value, radioList } = this.state
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
                        options={radioList}
                        value={value}
                        onClick={this.handleChange}
                    />
                </View>
                <View className='curtain' style={{display: show ? 'block' : 'none'}} onClick={this.handleClose}></View>
            </View>
        )
    }
}