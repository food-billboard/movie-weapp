import React, { useState, useCallback, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import { List } from '~components/commentlist'
import { getCustomerMovieCommentList, getMovieCommentList  } from '~services'
import { mapStateToProps, mapDispatchToProps } from './connect'

import './index.scss'

const CommentList = (props: {
  id: string,
  getUserInfo?: TGetUserInfo
  userInfo?: any 
}) => {

  const { id, getUserInfo } = props

  const [ value, setValue ] = useState([])

  const fetchData = useCallback(async () => {
    const isLogin = await getUserInfo?.({ prompt: false })
    const method = isLogin ? getCustomerMovieCommentList : getMovieCommentList
    const data = await method({ id, currPage: 0, pageSize: 20 })
    setValue(data.comment || [])
  }, [getUserInfo, id])

  const like = async () => {
    await fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <View className='page-detail-comment-list'>
      <List
        list={value}
        onLike={like}
      ></List>
    </View>
  )

}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)