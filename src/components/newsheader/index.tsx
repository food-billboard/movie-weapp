import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { IProps, IState } from './index.d'
import Ellipsis from '../ellipsis'
import ImageLoading from '../imageLoading'
import style from '~theme/style'
import { router, routeAlias } from '~utils'

import './index.scss'

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
        router.push(routeAlias.detail, {id})
    }

    public render() {
        const { content, style:propsStyle } = this.props
        const {detail, name, id, image} = content
        return (
            <View className='head'
                style={propsStyle}
                onClick={this.handleClick.bind(this, id)}>
                <View className='img'>
                    <ImageLoading src={image} loadingProps={{content: ''}} />
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
                    {'>'}
                </View>
            </View>
        )
    }
}