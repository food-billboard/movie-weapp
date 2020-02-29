import Taro, { Component } from '@tarojs/taro'
import { Video } from '@tarojs/components'
import { IProps } from './index.d'
import { isObject } from '~utils'

import './index.scss'

export default class Media extends Component<IProps>{
    public static defaultProps = {
        src: '',
        controls: true,
        autoplay: false,
        poster: '',
        initialTime: 0,
        id: 'video',
        loop: false,
        muted: false,
    }

    public error = (err) => {
        console.log(err)
    }

    public render() {
        const {
            src,
            controls=false,
            autoplay=false,
            poster,
            initialTime=0,
            id='video',
            loop=false,
            muted=false,
            style={}
        } = this.props
        return (
            <Video
                className='video'
                style={isObject(style) ? style : {}}
                src={src}
                controls={controls}
                autoplay={autoplay}
                poster={poster}
                initialTime={initialTime}
                id={id}
                loop={loop}
                muted={muted}
                onError={this.error}
            ></Video>
        )
    }
}