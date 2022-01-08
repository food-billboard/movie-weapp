import React, { useMemo, useState, useRef, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import ImageLoading from '~components/imageLoading'
import style from '~theme/style'
import { routeAlias, router } from '~utils'

import './index.scss'

export interface IList {
  image: string
  id: string
  content: string
}

const CommentHeader = (props: {
  list: IList[]
  id: string 
}) => {

  const { list, id } = props

  const [activeShow, setActiveShow] = useState<boolean>(false)
  const [active, setActive] = useState<string>('')

  const timerRef = useRef<any>()

  const showList = useMemo(() => {
    return list.length > 30 ? list.slice(0, 30) : list
  }, [list])

  //查看评论
  const handleClick = (value: string) => {
    clearTimeout(timerRef.current)
    setActiveShow(true)
    setActive(value)

    timerRef.current = setTimeout(() => {
      setActiveShow(false)
    }, 6000)
  }

  //打开评论界面
  const handleComment = useCallback(async () => {
    router.push(routeAlias.comment, {
      id,
    })
  }, [id])

  return (
    <View className='page-detail-icon-list'>
      <View
        className='page-detail-icon-list-text-content normal-font-size-class'
        style={{ visibility: activeShow ? 'visible' : 'hidden', ...style.backgroundColor('thirdly'), ...style.color('disabled') }}
        onClick={handleComment}
      >
        {active}
        <View
          className='page-detail-icon-list-content-arrow'
          style={{ ...style.border(20, 'primary', 'solid', 'top') }}
        ></View>
      </View>
      <ScrollView
        scrollX
        className='page-detail-icon-list-content'
        style={{ ...style.border(1, 'disabled', 'dashed', 'all'), boxSizing: 'content-box', boxShadow: '0 0 10rpx rgba(0, 0, 0, 0.12)' }}
      >
        {
          showList.map(val => {
            const { image, content, id } = val
            return (
              <View
                key={id}
                className='page-detail-icon-list-content-item'
                onClick={handleClick.bind(null, content)}
              >
                <ImageLoading src={image} loadingProps={{ content: '' }} />
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )

}

export default CommentHeader