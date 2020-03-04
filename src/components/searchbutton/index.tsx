import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtTag } from 'taro-ui'
import { router, routeAlias } from '~utils'
import { IProps, IState } from './index.d'
import style from '~theme/style'

import './index.scss'

const HOT_HEIGHT = 35

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
    }

    /**
     * 获取热搜信息
     */
    public getHot = (value: any, event: any) => {
        router.push(routeAlias.detail, {id: value.id})
    }

    /**
     * 搜索
     */
    public confirm = () => {
        const {value} = this.props
        this.props.confirm(value)
    }

    //处理点击搜索栏
    public handleClick = () => {
        const { disabled } = this.props
        if(!disabled) return
        router.push(routeAlias.search)
    }

    public render() {
        //获取热搜信息列表
        const { hot, focus, hotShow=HOT_HEIGHT, disabled=false } = this.props
        return (
            <View className="searchbutton"
                style={{...style.backgroundColor('bgColor')}}
            >
                <View className="search" onClick={this.handleClick}>
                    <AtSearchBar
                        customStyle={{...style.backgroundColor('bgColor')}}
                        onActionClick={this.confirm}
                        value={this.props.value} 
                        onChange={this.onChange}
                        actionName={"找一找"} 
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        focus={focus}
                        disabled={disabled}
                    />
                </View>
                <View className='at-row hotsearch at-row__align--center' style={{height: hotShow ? hotShow + 'px' : '0'}}>
                    <View className='at-col at-col-1 hotlist title'>热搜</View>
                    {
                        hot.map((value) => {
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
                    }
                </View>
            </View>
        )
    }
}

export default SearchButton