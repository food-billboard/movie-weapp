import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import GCheckbox from '~components/checkbox'
import { getLanguageList, getClassify } from '~services'
import { CheckboxOption } from 'taro-ui/types/checkbox'

export enum EDataType {
  LANGUAGE = 'LANGUAGE',
  CLASSIFY = 'CLASSIFY'
}

export interface IProps {
   value: Array<string>
   error?: boolean
   handleChange: (...args: Array<any>) => any
   type: EDataType
}

export interface IState {
  list: Array<CheckboxOption<string>>
}

export default class extends Component<IProps> {

  public state: IState = {
    list: []
  }

  public componentDidMount = async () => await this.fetchData()

  public fetchData = async() => {
    const { type } = this.props
    let method
    if(type === EDataType.CLASSIFY) {
      method = getClassify
    }else if(type === EDataType.LANGUAGE) {
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