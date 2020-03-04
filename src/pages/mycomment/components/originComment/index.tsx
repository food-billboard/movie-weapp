import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { IProps } from './index.d'
import style from '~theme/style'
import Ellipsis from '~components/ellipsis'

import { router, routeAlias } from '~utils'

import './index.scss'

export default class extends Component<IProps> {

  public static defaultProps: IProps = {
    info: {
      id: '',
      image: '',
      origin: true,
      content: '',
      hasImage: false,
      hasVideo: false
    }
  }

  public handleClick = (id, origin) => {
    if(origin) {
      router.push(routeAlias.comment, { id })
    }else {
      router.push(routeAlias.commentdetail, { id })
    }
  }

  public render() {

    const { info } = this.props
    const {
      id='',
      image='',
      origin=false,
      content='',
      hasImage=false,
      hasVideo=false
    } = info
    let text = content
    if(hasVideo) {
      text = '[视频]' + text
    }else if(hasImage) {
      text = '[图片]' + text
    }
    return(
      <View className='origin at-row'
        style={{...style.border(1, 'thirdly', 'dashed', 'all')}}
        onClick={() => {this.handleClick.call(this, id, origin)}}
      >
        {
          (image && image.length) ?
          <View className='at-col at-col-2'>
            <Image src={image} className='image'></Image>
          </View>
          : null
        }
        <View className={(image && image.length) ? 'at-col-10' : 'at-col-12'}>
          <Ellipsis
            text={text}
            needPoint={false}
            // style={{...style.color('thirdly')}}
            style={{color: 'gray'}}
          ></Ellipsis>
        </View>
      </View>
    )
  }

}