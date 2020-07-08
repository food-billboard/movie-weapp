import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem  } from 'taro-ui'
import './index.scss'
import { IProps, IState, List, IRadio } from './index.d'
import { withTry } from '~utils'
import { getOrderList } from '~services'

export default class RadioList extends Component<IProps>{

    public state:IState = {
        value: '',
        text: '',
        show: false,
        radioList: []
    }

    public componentDidMount = async() => {
        await this.fetchData()
    }

    //数据获取
    public fetchData = async () => {
        Taro.showLoading({mask: true, title: '稍等一下'})
        const [, data] = await withTry(getOrderList)()
        Taro.hideLoading()
        if(data) {
            this.setState({
                radioList: data.map((val:any) => {
                    const { name, _id } = val
                    return {
                        value: _id,
                        label: name,
                    }
                })
            })
        }
    }

    /**
     * 条件选择
     */
    public handleChange = (label: string, value: string) => {
        this.setState({
            value: value,
            text: label,
        })
        this.handleClose()
        this.props.screen(value)
    }

    /**
     * 列表显示控制
     */
    public showList = () => {
        const { show } = this.state
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
                            const { label, value } = val
                            return (
                                <AtActionSheetItem 
                                    key={value}
                                    onClick={ () => {this.handleChange.call(this, label, value)} }
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