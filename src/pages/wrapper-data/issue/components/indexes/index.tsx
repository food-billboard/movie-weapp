import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtTag } from 'taro-ui'
import { EIndexesType } from '../../interface'
import TagList from '~components/tagList'
import style from '~theme/style'
import { mapDispatchToProps, mapStateToProps } from './connect'

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
  boxSizing: 'border-box', 
  width:'100%', 
  marginBottom: '5px', 
  ...style.border(1, 'primary', 'dashed', 'all')
}

const Indexes = memo((props: IProps) => {

  const getTypeInfo = useCallback((props) => {
    const { type } = props 
    let info: any = {}
    switch(type) {
      case EIndexesType.actor:
        info.editMethod = props.editActor
        info.value = props.selectActor
        break
      case EIndexesType.director:
        info.editMethod = props.editDirector
        info.value = props.selectDirector
        break
      case EIndexesType.district:
        info.editMethod = props.editDistrict
        info.value = props.selectDistrict
        break
    }
    return info 
  }, [])

  const { wrapperStyle={}, onClick, value=[], onChange, isError, wraperRef, editMethod, propsValue, title } = useMemo(() => {
    const { value: propsValue } = props
    return {
      ...props,
      ...getTypeInfo(props) || {},
      propsValue
    } 
  }, [props])

  const onSelectChange = useCallback(async (value) => {
    onChange(value)
    await editMethod(value)
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
        customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
        type={'primary'}
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