import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Item from './item'
import { style } from '~theme/global-style'
import { router, formatTime, isObject, routeAlias } from '~utils'
import {  IProps } from './index.d'

import './index.scss'

export default class List extends Component<IProps>{
    public static defaultProps: IProps = {
        list: []
    }

    public goTo = (id: string) => {
        router.push(routeAlias.detail, {id})
    }

    public render() {
        const { list, style:propsStyle={} } = this.props
        return(
            <View className='list'>
                {
                    list.map((value) => {
                        const {image, name, type, time, hot, id} = value
                        return (
                            <View className='list-content'
                                style={{...(isObject(propsStyle) ? propsStyle : {}), ...style.backgroundColor('disabled')}}
                                key={id}
                                onClick={this.goTo.bind(this, id)}
                            >
                                <View className='img'>  
                                    <Image
                                        className='img-content'
                                        src={image}
                                    />
                                </View>
                                <View className='detail'
                                    style={{...style.backgroundColor('disabled'), ...style.color('secondary')}}
                                >
                                    <View className='name'
                                        style={{...style.color('primary')}}
                                    >
                                        {name}
                                    </View>
                                    <Item 
                                        type={'类型: '}
                                        value={type} 
                                    />
                                    <Item 
                                        type={'更新: '}
                                        value={formatTime(time)} 
                                    />
                                    <Item 
                                        type={'人气: '}
                                        value={hot} 
                                    />
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}