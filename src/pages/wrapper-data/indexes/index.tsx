import Taro, { getCurrentInstance } from '@tarojs/taro'
import {} from '@tarojs/components'
import React, { Component } from 'react'
import { AtIndexes } from 'taro-ui'
import { EIndexesType } from '../issue/interface'
import Selected from './components/Selected'
import BackButton from './components/Fab'
import { getDistrictList, getDirectorList, getActorList } from '~services'
import { routeAlias, router } from '~utils'

export interface Item {
  name: string
  _id: string 
  key: string 
  [propName: string]: any
}

interface ListItem {
  title: string

  key: string

  items: Array<Item>
}

function formatResponse(list: Item[]) {
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

interface IProps {}
interface IState {
  list: ListItem[]
  value: Item[]
}

export default class extends Component<IProps, IState>{

  state: IState = {
    list: [],
    value: []
  }

  type: EIndexesType

  componentDidMount = async () => {
    const router = getCurrentInstance().router
    const { value, type } = router?.params || {}
    await this.fetchData(type)
    try {
      this.setState({
        value: JSON.parse(decodeURIComponent(value as string))
      })
    }catch(err) {}
    if(type) this.type = type as EIndexesType
  }

  handleClick = (newItem: Item) => {
    const { value } = this.state 
    this.setState({
      value: [
        ...value.filter(item => item._id != newItem._id),
        newItem
      ]
    })
  }

  fetchData = async(type) => {
    let method 
    switch(type) {
      case EIndexesType.actor:
        method = getActorList
        break
      case EIndexesType.director:
        method = getDirectorList
        break
      case EIndexesType.district:
        method = getDistrictList
        break
    }
    const data = await method()
    const newValue = formatResponse(data)
    this.setState({
      list: newValue
    })
  }

  onSelectChange = (value: Item[]) => {
    this.setState({
      value
    })
  }

  back = () => {
    const { value } = this.state
    router.replace(routeAlias.issue, {
      type: this.type,
      value: JSON.stringify(value || [])
    })
  }

  render() {
    const { list, value } = this.state 
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