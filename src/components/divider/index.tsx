import Taro, { Component } from '@tarojs/taro'
import { AtDivider } from 'taro-ui'

import { IProps } from './interface'

import { isObject } from '~utils'

import './index.scss'

export default class Divider extends Component<IProps> {
    public static defaultProps: IProps = {
        content: '没有更多了',
        // fontColor: '#D3D3D3',
        fontSize: 32,
        // lineColor: '#D3D3D3',
        childNode: '',
        other: {}
    }

    public render() {
        const { content, fontSize, childNode, other } = this.props
        return (
            <AtDivider
                content={content}
                // fontColor={fontColor}
                fontSize={fontSize}
                // lineColor={lineColor}
                customStyle={{marginTop: '20px', ...(isObject(other) ? other : {})}}
            >
                {content ? '' : childNode}
            </AtDivider>
        )
    }
    
}