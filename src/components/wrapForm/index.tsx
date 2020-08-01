import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { createFieldsStore } from './fieldsStore'

export default class extends Component<any> {

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
    if(!this.props.name) return
    this.fieldsStore = createFieldsStore(this.props.name)
    this.fieldsStore.setProps(this.props)
  }

  render() {

    return (
      <View>
        {
          this.props.children
        }
      </View>
    )
  }

}