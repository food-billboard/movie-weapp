import Taro, { Component } from '@tarojs/taro'
import { AtDivider } from 'taro-ui'

interface IProps {
    content?: string
    fontColor?: string
    fontSize?: number
    lineColor?: string
    childNode?: any
    show: boolean
}

export default class Divider extends Component<IProps> {
    public static defaultProps: IProps = {
        content: '没有更多了',
        fontColor: '#D3D3D3',
        fontSize: 32,
        lineColor: '#D3D3D3',
        childNode: '',
        show: true
    }

    public render() {
        const { content, fontColor, fontSize, lineColor, show, childNode } = this.props
        return (
            <AtDivider
                content={content}
                fontColor={fontColor}
                fontSize={fontSize}
                lineColor={lineColor}
                className={ show ? 'show' : 'hide' }
                customStyle={{marginTop: '40px'}}
            >
                {content ? '' : childNode}
            </AtDivider>
        )
    }
    
}