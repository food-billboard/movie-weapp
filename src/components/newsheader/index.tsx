import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { IProps, IState } from './interface'
import Ellipsis from '../ellipsis'
import './index.scss'
import { style } from '~theme/global-style'
import { router } from '~utils'

export default class NewsHead extends Component<IProps, IState>{
    public static defaultProps: IProps = {
        content: {
            name: '',
            detail: '',
            image: '',
            id: ''  
        },
        style: {}
    }

    public handleClick = (id: string) => {
        router.push('/detail', {id})
    }

    public render() {
        const { content, style:propsStyle } = this.props
        const {detail, name, id, image} = content
        return (
            <View className='head'
                style={propsStyle}
                onClick={this.handleClick.bind(this, id)}>
                <View className='img'>
                    <Image src={image} className='content'></Image>            
                </View>
                <View className='detail'>
                    <View className='at-article'>
                        <View className='at-article__h3' style={{...style.color('primary')}}>
                            {name}
                        </View>
                        <View className='at-article__content'>
                            <View className='at-article__section'>
                                <View className='at-article__p article' style={{...style.color('thirdly')}}>
                                    <Ellipsis
                                        style={{padding:0}}
                                        text={detail}
                                    ></Ellipsis>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className={'enter'}
                    style={{color: 'rgb(193, 193, 193)'}}
                >
                    >
                </View>
            </View>
        )
    }
}