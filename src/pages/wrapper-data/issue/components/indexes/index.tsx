import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { pick } from 'lodash'
import Indexes from '~components/indexes'
import { EIndexesType } from '../../interface'
import { getDirectorList, getActorList, getDistrictList, getLanguageList, getClassify } from '~services'
import './index.scss'

export default class extends Component<any> {

  public state = {
    list: [],
    director: [],
    actor: [],
    district: [],
    // classify: [],
    // language: [],
    type: 'DIRECTOR'
  }

  public componentDidMount = async () => {
    await this.fetchData()
  }

  public fetchData = async () => {
    const actor = await getActorList()
    const director = await getDirectorList()
    const district = await getDistrictList()
    // const language = await getLanguageList()
    // const classify = await getClassify()
    this.setState({
      director: this.formatList(director),
      actor: this.formatList(actor),
      district: this.formatList(district),
      // language: this.formatList(language),
      // classify: this.formatList(classify)
    }, () => {
      console.log(this.state)
    })
  }

  private formatList = (list) => {
    return list.reduce((acc, cur) => {
      const { key } = cur 
      const exists = acc.findIndex(item => item.key == key)
      const newValue = pick(cur, ['name', '_id'])
      if(!!~exists) {
        acc[exists].items.push(newValue)
      }else {
        acc.push({
          title: key,
          key,
          items: [newValue]
        })
      }
      return acc 
    }, [])
  }

  public indexesVisible = async (type: EIndexesType) => {
    let active: any[] = []
    const { director, actor, district } = this.state
    switch(type) {
      case EIndexesType.ACTOR: active = [...actor]; break;
      case EIndexesType.DIRECTOR: active = [...director]; break;
      case EIndexesType.DISTRICT: active = [...district]; break;
      // case EIndexesType.CLASSIFY: active = [...classify]; break;
      // case EIndexesType.LANGUAGE: active = [...language]; break;
    }
    this.setState({
      list: active,
      type
    })
  }

  public handleClick = (item) => {
    const { type } = this.state
    this.props.handleClick(item, type)
  }

  public render() {

    const { list } = this.state

    return (
      <View className="issue-indexes">
        <Indexes
          handleClick={this.handleClick}
          list={list}
        >

        </Indexes>
      </View>
    )
  }

}