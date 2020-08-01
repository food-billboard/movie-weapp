import Taro, { Component } from '@tarojs/taro'
import Indexes from '~components/indexes'
import { TIndexesType } from '../../interface'
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

  public indexesVisible = async (type: TIndexesType) => {
    let active
    const { director, actor, district } = this.state
    switch(type) {
      case 'ACTOR': active = [...actor]; break;
      case 'DIRECTOR': active = [...director]; break;
      case 'DISTRICT': active = [...district]; break;
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
      <Indexes
        handleClick={this.handleClick}
        list={list}
      ></Indexes>
    )
  }

}