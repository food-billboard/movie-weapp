import Taro, { Component } from '@tarojs/taro'
import GCheckbox from '~components/checkbox'
import { getLanguageList, getClassify } from '~services'
import { IProps, IState } from './index.d'

export default class extends Component<IProps> {

  public state: IState = {
    list: []
  }

  public componentDidMount = async () => {
    await this.fetchData()
  }

  public fetchData = async() => {
    const { type } = this.props
    let method
    if(type === 'CLASSIFY') {
      method = getClassify
    }else if(type === 'LANGUAGE') {
      method = getLanguageList
    }
    const data = await method()
    this.setState({
      list: data.map(item => {
        const { name, _id } = item
        return {
          label: name,
          value: _id
        }
      })
    })
  }

  public render() {

    const { value, error } = this.props
    const { list } = this.state

    return (
      <GCheckbox
        needHiddenList={true}
        style={{marginBottom: '20px'}}
        checkboxOption={list}
        value={value}
        handleChange={this.props.handleChange}
        error={error}
      ></GCheckbox>
    )
  }

}