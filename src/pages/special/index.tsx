import Taro, { Component, Config } from '@tarojs/taro'
import Scroll from '~components/scrollList'

export default class extends Component<any>{

  public componentDidMount = async () => {
    await this.fetchData()
  }

  public fetchData = async () => {

  }

  public render() {
    return (
      <Scroll
      
      ></Scroll>
    )
  }

}