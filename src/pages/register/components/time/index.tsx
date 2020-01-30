import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from 'prop-types'
import './index.scss'

interface IState {
    text: string,
    open: boolean
}

interface getData {
    (): void
}

interface IProps {
    getData: getData,
    phone: string 
}

export default class Time extends Component<IProps>{
    public static propTypes = {
        getData: PropTypes.func
    }

    public state: IState = {
        text: '发送验证码',
        open:true
    }

    public constructor(){
        super(...arguments)
        this.handleClick = this.handleClick.bind(this)
    }

    /**
     * 处理点击
     */
    public handleClick() {
        const { open } = this.state
        const { phone } = this.props
        if(!/^1[346789]\d{9}$/g.test(phone)) {
            Taro.showToast({duration: 2000, title: '请输入正确的手机号'})
            return
        }
        if(!open) {
            return
        }
        this.props.getData()
        const _text = 's后重发'
        let count = 60
        this.setState({
            open: false,
            text: count + _text
        })
        let timer = setInterval(() => {
            if(count > 0) { 
                count --
                this.setState({
                    text: count + _text
                })
            }else {
                this.setState({
                    open: true,
                    text: '发送验证码'
                })
                clearInterval(timer)
            }
        }, 1000)
    }

    public render() {
        const {open, text} = this.state
        return (
            <View 
                className={'time ' + (open ? 'color' : '')}
                onClick={this.handleClick}
            >
                {text}
            </View>
        )
    }
}