import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { AtIndexes } from 'taro-ui'
import { connect } from 'react-redux'
import { EIndexesType } from '../issue/interface'
import Selected from './components/Selected'
import BackButton from './components/Fab'
import { router } from '~utils'
import { mapDispatchToProps, mapStateToProps } from './connect'

interface ListItem {
  title: string

  key: string

  items: Model_Issue.IItem[]
}

function formatResponse(list: Model_Issue.IItem[]) {
  return list.reduce((acc, cur) => {
    const { key } = cur 
    let index = acc.findIndex(item => item.key == key)
    if(!~index) {
      acc.push({
        title: key,
        key,
        items: []
      })
      index = acc.length - 1
    }
    acc[index].items.push(cur)
    return acc 
  }, [] as ListItem[])
}

interface IProps {
  actor: Model_Issue.IItem[]
  director: Model_Issue.IItem[] 
  district: Model_Issue.IItem[]
  selectDistrict: Model_Issue.IItem[]
  selectDirector: Model_Issue.IItem[]
  selectActor: Model_Issue.IItem[]
  fetchDistrict: any 
  fetchDirector: any 
  fetchActor: any 
  editDirector: any 
  editDistrict: any 
  editActor: any 
}

interface IState {
  list: ListItem[]
}

class Indexes extends Component<IProps, IState>{

  state: IState = {
    list: [],
  }

  type: EIndexesType

  fetchDataMethod: any 
  editMethod: any 
  origin: any 

  get typeInfo() {
    let info: any = {}
    switch(this.type) {
      case EIndexesType.actor:
        info.fetchData = this.props.fetchActor
        info.editMethod = this.props.editActor
        info.origin = this.props.actor
        info.value = this.props.selectActor
        break
      case EIndexesType.director:
        info.fetchData = this.props.fetchDirector
        info.editMethod = this.props.editDirector
        info.origin = this.props.director
        info.value = this.props.selectDirector
        break
      case EIndexesType.district:
        info.fetchData = this.props.fetchDistrict
        info.editMethod = this.props.editDistrict
        info.origin = this.props.district
        info.value = this.props.selectDistrict
        break
    }
    return info 
  }

  componentDidMount = async () => {
    const router = getCurrentInstance().router
    const { type } = router?.params || {}
    if(type) {
      this.type = type as EIndexesType
    }
    const { fetchData, editMethod, origin } = this.typeInfo
    this.fetchDataMethod = fetchData
    this.editMethod = editMethod 
    this.origin = origin
    await this.fetchData()
  }

  handleClick = async (newItem: Model_Issue.IItem) => {
    const { value } = this.typeInfo || {}
    await this.editMethod([
      ...(value || []).filter((item: Model_Issue.IItem) => item._id != newItem._id),
      newItem
    ])
  }

  fetchData = async() => {
    const data = await this.fetchDataMethod?.() || []
    const newValue = formatResponse(data)
    this.setState({
      list: newValue
    })
  }

  onSelectChange = (value: Model_Issue.IItem[]) => {
    this.editMethod(value)
  }

  back = () => {
    router.back()
  }

  render() {
    const { list } = this.state 
    const { value=[] } = this.typeInfo || {}
    return (
      <AtIndexes
        list={list}
        onClick={this.handleClick}
      >
        <Selected
          value={value}
          onChange={this.onSelectChange}
        />
        <BackButton
          onClick={this.back}
        />
      </AtIndexes>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Indexes)