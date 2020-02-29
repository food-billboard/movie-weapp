import Taro, { Component } from '@tarojs/taro'
import { AtDivider } from 'taro-ui'
import { TypeColor } from '~theme/global-style'
import { IProps } from './index.d'

import { isObject } from '~utils'

import './index.scss'

export default class Divider extends Component<IProps> {
    public static defaultProps: IProps = {
        content: '没有更多了',
        fontSize: 32,
        childNode: '',
        other: {}
    }

    public render() {
        const { 
            content, 
            fontSize, 
            childNode, 
            other, 
            fontColor=TypeColor['thirdly'], 
            lineColor=TypeColor['thirdly'] 
        } = this.props
        return (
            <AtDivider
                content={content}
                fontColor={fontColor}
                fontSize={fontSize}
                lineColor={lineColor}
                customStyle={{marginTop: '20px', ...(isObject(other) ? other : {})}}
            >
                {content ? '' : childNode}
            </AtDivider>
        )
    }
    
}