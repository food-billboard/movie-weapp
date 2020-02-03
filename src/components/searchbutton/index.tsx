import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import { AtSearchBar, AtButton } from 'taro-ui'
import './index.scss'
import {router} from '~utils'

interface Hot {
    name: string,
    id: string
}

interface IProps {
    value: string,
    disabled: boolean,
    hot: Array<Hot>,
    confirm: any
}

interface IState {
    focus: boolean
    value?: string
}

class SearchButton extends Component<IProps, IState>{
    //默认数据
    public static defaultProps: IProps = {
        value: '',
        disabled: false,
        hot: [],
        confirm: () => {}
    }

    public constructor() {
        super(...arguments)

        this.onChange = this.onChange.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.confirm = this.confirm.bind(this)
    }

    public state: IState = {
        focus: false
    }

    /**
     * 监听输入框改变
     */
    public onChange(value: string = ''):any {
        this.setState({
            value: value
        })
    }

    /**
     *监听失去焦点 
     */
    public onBlur():any {
        this.setState({
            focus: false
        })
    }

    /**
     * 监听获取焦点
     */
    public onFocus():any {
        const { disabled } = this.props
        this.setState({
            focus: true
        })
        if(!disabled) return
        router.push('/search')
    }

    /**
     * 获取热搜信息
     */
    public getHot(value: any, event: any): void {
        router.push('/detail', {id: value.id})
    }

    /**
     * 搜索
     */
    public confirm() {
        const {value} = this.props
        this.props.confirm(value)
    }

    public render() {
        //获取热搜信息列表
        const { hot } = this.props
        const hotList = hot.map((value) => {
            const { name, id } = value
            return (
                <View className='at-col at-col-2 hotlist'
                    key={id}>
                    <AtButton 
                        type={"secondary"}
                        size={"small"}
                        circle={true}
                        openType={"openSetting"}
                        onClick={(event) => {this.getHot(value, event)}}
                    >{name}</AtButton>
                </View>
            )
        })
        return (
            <View className="searchbutton">
                <View className="search">
                    <AtSearchBar
                        onActionClick={this.confirm}
                        value={this.props.value} 
                        onChange={this.onChange}
                        actionName={"找一找"} 
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
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