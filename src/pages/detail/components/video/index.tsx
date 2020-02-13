import Taro, { Component } from '@tarojs/taro'
import { Video } from '@tarojs/components'
import './index.scss'

export interface IProps {
    src: string,
    controls?: boolean,
    autoplay?: boolean,
    poster: string,
    initialTime?: number,
    id?: string,
    loop?: boolean,
    muted?: boolean,
}

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

    public constructor() {
        super(...arguments)
        this.state = {
            
        }
        this.error = this.error.bind(this)
    }

    public error(err) {
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
            muted=false
        } = this.props
        return (
            <Video
                className='video'
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