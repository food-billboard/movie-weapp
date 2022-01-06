import React, { memo, useCallback, useEffect, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtTag } from 'taro-ui'
import TagList from '~components/tagList'
import style from '~theme/style'
import { mapDispatchToProps, mapStateToProps } from './connect'
import { EIndexesType } from '../../interface'

interface IProps {
  selectDistrict: Model_Issue.IItem[]
  selectDirector: Model_Issue.IItem[]
  selectActor: Model_Issue.IItem[]
  editDirector: any 
  editDistrict: any 
  editActor: any 
  wrapperStyle?: React.CSSProperties
  onClick: () => void 
  onChange: (value: any) => void 
  isError: boolean
  type: EIndexesType
  wraperRef: any 
  value: Model_Issue.IItem[]
  title: string 
}

const TAT_STYLE: any = {
  width:'100%', 
  marginBottom: '5px', 
}

const Indexes = memo((props: IProps) => {

  const getTypeInfo = (originProps) => {
    const { type, editActor, selectActor, editDirector, selectDirector, editDistrict, selectDistrict } = originProps 
    let info: any = {}
    switch(type) {
      case EIndexesType.actor:
        info.editMethod = editActor
        info.value = selectActor
        break
      case EIndexesType.director:
        info.editMethod = editDirector
        info.value = selectDirector
        break
      case EIndexesType.district:
        info.editMethod = editDistrict
        info.value = selectDistrict
        break
    }
    return info 
  }

  const { wrapperStyle={}, onClick, value=[], onChange, isError, wraperRef, editMethod, propsValue, title } = useMemo(() => {
    const { value: originValue } = props
    return {
      ...props,
      ...getTypeInfo(props) || {},
      propsValue: originValue
    } 
  }, [props])

  const onSelectChange = useCallback(async (selectValue) => {
    onChange(selectValue)
    await editMethod(selectValue)
  }, [editMethod, onChange])

  const diff = useCallback((targetA: any[], targetB: any[]) => {
    if(targetA.length != targetB.length) return true 
    return !targetA.every(item => targetB.some(diffItem => diffItem._id == item._id))
  }, [])

  useEffect(() => {
    if(diff(value || [], propsValue || [])) {
      onChange(value || [])
    }
  }, [value])

  useEffect(() => {
    if(diff(value || [], propsValue || [])) {
      editMethod(propsValue)
    }
  }, [propsValue])

  return (
    <View style={wrapperStyle}>
      <AtTag 
        onClick={onClick}
        className='box-sizing-border'
        customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
        type='primary'
      >
        {title}
      </AtTag>
      <TagList
        ref={wraperRef}
        style={{marginBottom: '10px'}}
        list={value}
        handleChange={onSelectChange}
        error={isError}
      ></TagList>
    </View>
  )

})

export default connect(mapStateToProps, mapDispatchToProps)(Indexes)