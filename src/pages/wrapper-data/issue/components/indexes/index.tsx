import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import Indexes from '~components/indexes'
import { EIndexesType } from '../../interface'
import { getDirectorList, getActorList, getDistrictList } from '~services'

export default class extends Component<any> {

  public state = {
    list: [],
    director: [],
    actor: [],
    district: [],
    type: 'DIRECTOR'
  }

  public componentDidMount = async () => {
    await this.fetchData()
  }

  public fetchData = async () => {
    const actor = await getActorList()
    const director = await getDirectorList()
    const district = await getDistrictList()
    this.setState({
      director,
      actor,
      district
    })
  }

  public indexesVisible = async (type: EIndexesType) => {
    let active: any[] = []
    const { director, actor, district } = this.state
    switch(type) {
      case EIndexesType.ACTOR: active = [...actor]; break;
      case EIndexesType.DIRECTOR: active = [...director]; break;
      case EIndexesType.DISTRICT: active = [...district]; break;
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
    console.log(list, 11111111)

    return (
      <Indexes
        handleClick={this.handleClick}
        list={list}
      ></Indexes>
    )
  }

}