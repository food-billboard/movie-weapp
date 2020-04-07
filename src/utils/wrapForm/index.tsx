import Taro, { Component } from '@tarojs/taro'
import { Block } from '@tarojs/components'
import { createFieldsStore, getAllFieldsStoreName, deleteFieldsStore } from './createFieldsStore'

export default class extends Component {

  fieldsStore

  constructor() {
    super(...arguments)
    this.init()
  }

  componentWillReceiveProps(props) {
    const { options={} } = this.fieldsStore
    if(options.mapPropsToFields) {
      this.fieldsStore.setFields(options.mapPropsToFields(props))
    }
  }

  init() {
    const { name } = this.props
    if(!name) return
    this.fieldsStore = createFieldsStore(name, undefined, undefined)
    this.fieldsStore.setProps(this.props)
  }

  render() {

    return (
      <Block>
        {
          this.props.children
        }
      </Block>
    )
  }

}

export {
  createFieldsStore, 
  getAllFieldsStoreName, 
  deleteFieldsStore
}