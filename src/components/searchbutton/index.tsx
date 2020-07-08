import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { router, routeAlias } from '~utils'
import { IProps, IState, IPoint } from './index.d'
import style from '~theme/style'

import './index.scss'

class SearchButton extends Component<IProps, IState>{
    //默认数据
    public static defaultProps: IProps = {
        value: '',
        disabled: false,
        confirm: () => {},
        focus: false,
        control: () => {},
    }

    public state: IState = {
        focus: false,
        pointList: []
    }

    /**
     * 监听输入框改变
     */
    public onChange = (value: string = '') => {
        // this.setState({
        //     value: value,
        // }, async() => {
        //     const pointList = await this.props.fetchSearchPoint(value)
        //     const { data } = pointList
        //     this.setState({
        //         pointList: value.length ? data : []
        //     })
        // })
    }

    /**
     *监听失去焦点 
     */
    public onBlur = () => {
        this.setState({
            focus: false,
            pointList: []
        })
        if(this.props.control) this.props.control(true)
    }

    /**
     * 监听获取焦点
     */
    public onFocus = () => {
        if(this.props.control) this.props.control(false)
        this.setState({
            focus: true
        })
    }

    /**
     * 搜索
     */
    public confirm = () => {
        const {value} = this.props
        this.props.confirm && this.props.confirm(value)
        this.setState({
            pointList: []
        })
    }

    //处理点击搜索栏
    public handleClick = () => {
        const { disabled } = this.props
        if(!disabled) return
        router.push(routeAlias.search)
    }

    public render() {
        //获取热搜信息列表
        const { focus, disabled=false } = this.props
        const { pointList } = this.state

        return (
            <View className="searchbutton">
                <View className="search" onClick={this.handleClick}>
                    <AtSearchBar
                        customStyle={{...style.backgroundColor('bgColor')}}
                        onActionClick={this.confirm}
                        value={this.props.value} 
                        onChange={this.props.handleChange ? this.props.handleChange : this.onChange}
                        actionName={"找一找"} 
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        focus={focus}
                        disabled={disabled}
                    />
                </View>
                {
                    pointList.length ?
                    (<View 
                        className='point-list'
                        style={{...style.backgroundColor('disabled')}}
                    >
                        {
                            pointList.map((val: IPoint) => {
                                const { value: point } = val
                                return (
                                    <View 
                                        className='point'
                                        key={point}
                                        style={{...style.border(1, 'bgColor', 'dashed', 'bottom')}}
                                    >
                                        {point}
                                    </View>
                                )
                            })
                        }
                    </View>)
                    :
                    null
                }
            </View>
        )
    }
}

export default SearchButton