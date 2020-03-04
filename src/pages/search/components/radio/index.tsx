import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem  } from 'taro-ui'
import './index.scss'
import { IProps, IState, List, IRadio } from './index.d'
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
    public handleChange = (id: string, value: string) => {
        this.setState({
            value: id,
            text: value,
        })
        this.handleClose()
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
        const { text, show, radioList } = this.state
        return (
            <View className='radio'>
                <Text className='select'
                    onClick={this.showList}
                >
                    {text}
                </Text>

                <AtActionSheet 
                    isOpened={show}
                    cancelText='取消' 
                    title='排序方式' 
                    onCancel={ this.handleClose } 
                    onClose={ this.handleClose }
                >
                    {
                        radioList.map((val: List) => {
                            const { id, label, value } = val
                            return (
                                <AtActionSheetItem 
                                    key={id}
                                    onClick={ () => {this.handleChange.call(this, id, value)} }
                                >
                                    {label}
                                </AtActionSheetItem>
                            )
                        })
                    }
                </AtActionSheet>
            </View>
        )
    }
}