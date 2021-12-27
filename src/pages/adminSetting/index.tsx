import React, { memo, useCallback, useMemo, useState } from 'react'
import Taro from '@tarojs/taro'
import { AtInput, AtForm, AtButton, AtImagePicker } from 'taro-ui'
import { AtImagePickerProps } from 'taro-ui/types/image-picker'
import { Text, View } from '@tarojs/components'
import { connect } from 'react-redux'
import { Upload, EMediaType } from '~utils'
import { putUsername, putAvatar } from '~services'
import { mapDispatchToProps, mapStateToProps } from './connect'
import './index.scss'

const Setting = memo((props: any) => {

  const { getUserInfo, userInfo } = useMemo(() => {
    const { userInfo: originUserInfo, ...nextProps } = props 
    const { avatar, ...nextUserInfo } = originUserInfo || {}
    return {
      ...nextProps,
      userInfo: {
        ...nextUserInfo,
        avatar: avatar ? [{
          url: avatar
        }] : []
      }
    }   
  }, [props])

  const [ username, setUserName ] = useState<string>(userInfo?.username || '')
  const [ avatar, setAvatar ] = useState<AtImagePickerProps["files"]>(userInfo?.avatar || [])

  const onUserNameChange = useCallback((value) => {
    setUserName(value)
  }, [])

  const onAvatarChange = useCallback((files) => {
    setAvatar(files)
  }, [])

  const submit = useCallback(async () => {
    let emptySubmit = true 
    try {
      if(username) {
        emptySubmit = false 
        await putUsername(username)
      }
      if(avatar.length) {
        emptySubmit = false 
        const [ result ] = await Upload({
          url: avatar[0].url,
          type: EMediaType.IMAGE
        }) || []
        if(!result || !result.success) {
          await Promise.reject()
        }
        await putAvatar(result.url)
      }
      if(emptySubmit) return Taro.showToast({
        title: '至少填写一项',
        icon: 'none',
        duration: 1000
      })
      await getUserInfo()
    }catch(err) {
      Taro.showToast({
        title: '修改失败',
        icon: 'none',
        duration: 1000
      })
    }
  }, [ username, avatar, getUserInfo ])

  return (
    <AtForm
      customStyle={{position: 'relative', height: '100vh'}}
    >
      <AtInput
        name='username'
        title='用户名'
        type='text'
        placeholder='请输入用户名'
        value={username}
        onChange={onUserNameChange}
      />
      <View
        className='admin-setting-avatar'
      >
        <Text className='at-input__title'>头像</Text>
        <AtImagePicker
          files={avatar}
          count={1}
          length={1}
          onChange={onAvatarChange}
          multiple={false}
          showAddBtn={!avatar.length}
        />  
      </View>
      <AtButton 
        customStyle={{
          position: 'absolute',
          bottom: 0,
          width: '100%'
        }} 
        onClick={submit}
      >确定</AtButton>
    </AtForm>
  )

})

export default connect(mapStateToProps, mapDispatchToProps)(Setting)