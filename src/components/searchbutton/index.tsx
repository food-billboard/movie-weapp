import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtTag } from 'taro-ui'
import { router, routeAlias } from '~utils'
import { IProps, IState, IPoint } from './index.d'
import style from '~theme/style'
import { SYSTEM_PAGE_SIZE } from '~config'
import { getHot } from '~services'

import './index.scss'

const HOT_HEIGHT = SYSTEM_PAGE_SIZE(35)

class SearchButton extends Component<IProps, IState>{
    //默认数据
    public static defaultProps: IProps = {
        value: '',
        disabled: false,
        confirm: () => {},
        focus: false,
        control: () => {},
        getHot: () => {},
        fetchSearchPoint: () => {}
    }

    public state: IState = {
        focus: false,
        hot: [],
        pointList: []
    }

    public componentDidMount = async () => {
        await this.fetchHotData()
    }

    //获取热搜
    public fetchHotData = async () => {
        const hot = await getHot()
        await this.setState({
            hot
        })
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
     * 获取热搜信息
     */
    public getHot = (id: string, _: any) => {
        router.push(routeAlias.detail, {id})
    }

    /**
     * 搜索
     */
    public confirm = () => {
        const {value} = this.props
        this.props.confirm(value)
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
        const { focus, hotShow=HOT_HEIGHT, disabled=false } = this.props
        const { hot=[], pointList } = this.state

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
                    (<View 
                        className='at-row hotsearch at-row__align--center' 
                        style={{height: hotShow ? hotShow + 'px' : '0', ...style.backgroundColor('bgColor'), ...style.color('primary')}}>
                        <View 
                            className='at-col at-col-1 hotlist title'
                        >热搜</View>
                        {
                            hot.map((value) => {
                                const { key_word, _id: id } = value
                                return (
                                    <View className='at-col at-col-2 hotlist'
                                        key={id}>
                                        <AtTag 
                                            customStyle={{...style.backgroundColor('disabled'), ...style.color('primary')}}
                                            type={"primary"}
                                            size={"normal"}
                                            circle={true}
                                            onClick={(event) => {this.getHot(id, event)}}
                                        >{key_word}</AtTag>
                                    </View>
                                )
                            })
                        }
                    </View>)
                }
            </View>
        )
    }
}

export default SearchButton