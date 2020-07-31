import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import ImageLoading from '~components/imageLoading'
import style from '~theme/style'
import Ellipsis from '~components/ellipsis'

import { router, routeAlias } from '~utils'

import './index.scss'

export interface IProps {
  info: {
    source_type: ESourceType
    source: {
      _id: string
      content: string | null
    }
  }
 }

export enum ESourceType {
  MOVIE,
  USER
}

export default class extends Component<IProps> {

  public static defaultProps: IProps = {
    info: {
      source_type: ESourceType.MOVIE,
      source: {
        _id: '',
        content: ''
      }
    }
  }

  public handleClick = (id: string, origin: ESourceType) => {
    if(origin === ESourceType.MOVIE) {
      router.push(routeAlias.comment, { id })
    }else {
      router.push(routeAlias.commentdetail, { id })
    }
  }

  public render() {

    const { info: {
      source_type,
      source: {
        _id,
        content
      }
    } } = this.props

    
    return(
      <View className='origin at-row'
        style={{...style.border(1, 'thirdly', 'dashed', 'all')}}
        onClick={() => {this.handleClick.call(this, _id, source_type)}}
      >
        {/* {
          (image && image.length) ?
          <View className='at-col at-col-2'>
            <ImageLoading src={image} loadingProps={{content: ''}} />
          </View>
          : null
        } */}
        <View className={(false) ? 'at-col-10' : 'at-col-12'}>
          <Ellipsis
            text={content ? content : '[媒体]'}
            needPoint={false}
            style={{color: 'gray'}}
          ></Ellipsis>
        </View>
      </View>
    )
  }

}