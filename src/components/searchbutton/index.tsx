import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtTag } from 'taro-ui'
import './index.scss'
import { router } from '~utils'
import { IProps, IState } from './interface'
import { style } from '~theme/global-style'

class SearchButton extends Component<IProps, IState>{
    //默认数据
    public static defaultProps: IProps = {
        value: '',
        disabled: false,
        hot: [],
        confirm: () => {},
        focus: false,
        control: () => {}
    }

    public state: IState = {
        focus: false
    }

    /**
     * 监听输入框改变
     */
    public onChange = (value: string = '') => {
        this.setState({
            value: value
        })
    }

    /**
     *监听失去焦点 
     */
    public onBlur = () => {
        this.setState({
            focus: false
        })
        if(this.props.control) this.props.control(true)
    }

    /**
     * 监听获取焦点
     */
    public onFocus = () => {
        const { disabled } = this.props
        if(this.props.control) this.props.control(false)
        this.setState({
            focus: true
        })
        if(!disabled) return
        router.push('/search')
    }

    /**
     * 获取热搜信息
     */
    public getHot = (value: any, event: any) => {
        router.push('/detail', {id: value.id})
    }

    /**
     * 搜索
     */
    public confirm = () => {
        const {value} = this.props
        this.props.confirm(value)
    }

    public render() {
        //获取热搜信息列表
        const { hot, focus } = this.props
        const hotList = hot.map((value) => {
            const { name, id } = value
            return (
                <View className='at-col at-col-2 hotlist'
                    key={id}>
                    <AtTag 
                        customStyle={{...style.backgroundColor('disabled')}}
                        type={"primary"}
                        size={"normal"}
                        circle={true}
                        onClick={(event) => {this.getHot(value, event)}}
                    >{name}</AtTag>
                </View>
            )
        })
        return (
            <View className="searchbutton"
                style={{...style.backgroundColor('bgColor')}}
            >
                <View className="search">
                    <AtSearchBar
                        customStyle={{...style.backgroundColor('bgColor')}}
                        onActionClick={this.confirm}
                        value={this.props.value} 
                        onChange={this.onChange}
                        actionName={"找一找"} 
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        focus={focus}
                    />
                </View>
                <View className='at-row hotsearch'>
                    <View className='at-col at-col-1 hotlist title'>热搜</View>
                    {hotList}
                </View>
            </View>
        )
    }
}

export default SearchButton