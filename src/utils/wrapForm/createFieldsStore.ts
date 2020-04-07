import AsyncValidator from 'async-validator'

const DEFAULT_FIELD_META = {
  name: '',
}
const OPTIONS_NAME = [ 'validateMessages', 'onFieldsChange', 'onValuesChange', 'mapPropsToFields', 'getOnChangeValue' ]

class FieldsStore {

  fields
  fieldsMeta 
  options
  name
  props

  constructor(ne, ops, fies) {

    let fields,
        options,
        name = ne
    if(!!!ops) {
      fields = undefined
      options = undefined
    }else if(!!fies) {
      options = ops
      fields = fies
    }else {
      if(typeof ops === 'object') {
        const result = Object.keys(ops).some(name => {
          return OPTIONS_NAME.includes(name)
        })
        if(result) {
          options = ops
        }else {
          fields = ops
        }
      }
    }

    this.fields = fields || {}
    this.fieldsMeta = {}
    this.options = options || {}
    this.name = name

    //自定义value获取
    if(typeof options === 'object' && 'getOnChangeValue' in options) {
      this.getOnChangeValue = options.getOnChangeValue.bind(this)
    }

  }

  form = ['setUpdate', 'setProps', 'getFieldsValue', 'getFieldValue', 'setFieldsValue', 'setFields', 'setFieldsInitialValue', 'getFieldProps', 'getFieldsError', 'validateFields', 'resetFields']

  //获取表单onChane的vlaue
  _getOnChangeValue = function(e) {
    return e.detail.value
  }

  set getOnChangeValue(callback) {
    this._getOnChangeValue = callback.bind(this)
  }

  get getOnChangeValue() {
    return this._getOnChangeValue
  }

  setProps(props) {
    this.props = props
  }

  update() {}

  setUpdate(callback) {
    this.update = callback
  }

  /**
   * 为表单字段添加onChange和value属性
   */
  getFieldProps = function(ne, pr, fp) {

    let name, props, fieldOptions

    if(!ne) {
      throw new Error('name为必填项')
    }else{
      name = ne
      if(pr && typeof pr === 'string') {
        props = pr
        fieldOptions = fp
      }else if(pr && typeof pr === 'object') {
        props = undefined
        fieldOptions = pr
      }else {
        props = undefined
        fieldOptions = {}
      }
    }

    const { getOnChangeValue, ...options } = fieldOptions

      //设置初始值
      const newFieldMeta = {
        ...DEFAULT_FIELD_META,
        ...options,
        name
      }
      if(!!!this.fields[name]) {
        this.setFields({[name]: {name}})
      }else {
        this.fields[name] = { ...this.fields[name], name }
      }
      
      this.fieldsMeta[name] = { ...this.getFieldMeta(name), ...newFieldMeta }
      if('initialValue' in newFieldMeta && !this.fields[name].value) {
        this.setFieldsValue({[name]: newFieldMeta.initialValue})
      }

    //返回响应的配置属性
    const configProps = {
      value: this.getFieldValue(name),
      onChange: (event) => {
        let value
        if(!!getOnChangeValue && typeof getOnChangeValue === 'function') {
          value = getOnChangeValue(event)
        }else {
          value = this.getOnChangeValue(event)
        }
        this.setFieldsValue({[name]: value})
      }
    }
    if(!props) return configProps
    return configProps[props]

  }

  //判断是否存在验证规则
  hasRules = function(name) {
    const { fieldsMeta } = this
    const fieldMeta = fieldsMeta[name]
    return !!fieldMeta.rules && Array.isArray(fieldMeta.rules) && fieldMeta.rules.length
  }

  //获取fields的value
  getFieldsValue = function(ns) {
    const { fields, fieldsMeta } = this
    const names = ns ? (Array.isArray(ns) ? ns : [ns]) : Object.keys(fields)
    return names.reduce((acc, name) => {
      let value
      if('value' in fields[name]) {
        value = fields[name].value
      }else {
        value = fieldsMeta[name].initialValue
      }
      acc[name] = value
      return acc
    }, {})
  }

  //获取字段的value
  getFieldValue = function(name) {
    this.fields[name] = this.fields[name] || {}
    return this.fields[name].value ? this.fields[name].value : this.getFieldMeta(name).value
  }

  //设置fields
  setFields = (fields) => {
    const nowFields = {
      ...this.fields,
      ...fields
    }
    Object.keys(nowFields).forEach(name => {
      this.fieldsMeta[name] = this.fieldsMeta[name] || {}
    })
    this.fields = nowFields

    if (this.options.onFieldsChange) {
      //改变的字段
      const changedFields = Object.keys(fields).reduce((acc, name) => {
        acc[name] = this.fields[name]
        return acc
      }, {},)

      this.options.onFieldsChange(
        {
          [this.name]: this.form.reduce((acc, method) => {
            acc[method] = this[method].bind(this)
            return acc
          }, {}),
          ...this.props,
        },
        changedFields,
        this.fields
      )
    }

    this.update()
  }

  //设置字段的值
  setFieldsValue = function(values) {

    const { fields } = this
    const newFields = Object.keys(values).filter(name => {
      return !!fields[name] && !!this.getFieldMeta(name)
    }).reduce((acc, fieldName) => {
      acc[fieldName] = {
        ...fields[fieldName],
        name: fieldName,
        value: values[fieldName]
      }
      return acc
    }, {})

    this.setFields(newFields)

    //存在options value发生改变
    if(this.options.onValuesChange) {
      const allValues = this.getFieldsValue()
      this.options.onValuesChange(
        {
          [this.name]: this.form.reduce((acc, method) => {
            acc[method] = this[method]
            return acc
          }, {}),
          ...this.props,
        },
        values,
        allValues,
      );
    }

  }

  //设置表单字段的初始value
  setFieldsInitialValue = function(initialValues) {
    Object.keys(initialValues).forEach(name => {
      if(this.fieldMeta[name]) {
        const newFieldMeta = {
          ...this.getFieldMeta(name),
          initialValue: initialValues[name]
        }
        this.setFieldMeta(name, newFieldMeta)
      }
    })
  }

  //字段重置
  resetFields = function(ns) {
    const { fields } = this
    const names = ns ? ns : Object.keys(fields)
    names.forEach(name => {
      fields[name] = {}
    })
    this.setFields(fields)
  }

  //表单验证内部
  validateFieldsInternal = function(fields, { fieldNames, options={}, action }, callback) {

    const allRules = {}
    const allFields = {}
    const allValues = {}

    fields.forEach(field => {

      const { name } = field
      const fieldMeta = this.getFieldMeta(name)
      const newField = {
        ...field
      }

      newField.errors = undefined
      allRules[name] = fieldMeta.rules
      allFields[name] = newField
      allValues[name] = newField.value

    })
    this.setFields(allFields)

    //验证
    const validator: any = new AsyncValidator(allRules)

    if (this.options.validateMessages) {
      validator.messages(this.options.validateMessages);
    }

    validator.validate(allValues, options, errors => {
      if(errors && errors.length) {
        errors.forEach(error => {
          const errorFieldName = error.field
          this.fields[errorFieldName].errors = this.fields[errorFieldName].errors || []
          this.fields[errorFieldName].errors.push(error)
        })
      }

      if(callback) {
        callback(
          errors,
          this.getFieldsValue(fieldNames)
        )
      }

    })

  }

  //表单验证
  validateFields = function(ns, ops, cbk) {
    const pending = new Promise((resolve, reject) => {

      let names, options, callback
      if(!!!ns && !!!ops && !!cbk) {
        throw new Error('参数必填或填错')
      }else if(!!ns && !!ops && !!!cbk) {
        names = ns
        if(typeof ops === 'object') {
          options = ops
        }
        else if(typeof ops === 'function') {
          callback = ops
        }
      }else if(!!ns && !!!ops && !!!cbk) {
        names = ns
      }

      //回调函数处理
      if(!!!callback || typeof callback === 'function') {
        const oldBack = callback
        callback = (errors, values) => {
          if(oldBack) {
            oldBack(errors, values)
          }
          if(errors) {
            reject({errors, values})
          }else {
            resolve(values)
          }
        }
      }

      //获取验证字段名称集合
      const fieldNames = names ?
        names:
        Object.keys(this.fields)
      const fields = fieldNames.filter(name => {
        return this.hasRules(name)
      }).map(name => {
        return this.fields[name]
      })
      if(!fields.length) callback(null, this.getFieldsValue(fieldNames))

      this.validateFieldsInternal(
        fields,
        {
          fieldNames,
          options
        },
        callback
      )

    })

    //错误处理
    pending.catch(e => {
      return e
    })

    return pending
  }

  //单一表单验证
  validateField = function(name) {

    const rules = this.fieldsMeta[name].rules
    if(Array.isArray(rules) && rules.length) {
      const validator = new AsyncValidator({name: rules})
      validator.validate((values, options={}, errors) => {
        this.fields[name].errors = []
        if(errors) {
          errors.forEach(error => {
            this.fields[name].errors.push(error)
          })
        }
      })
    }

  }

  //获取字段错误
  getFieldsError = function(nes) {
    const { fieldsMeta, fields } = this
    //获取全部错误
    if(nes === undefined) {
      return Object.keys(fields).filter(name => {
        return !!fieldsMeta[name].errors
      }).reduce((acc, name) => {
        acc[name] = fieldsMeta.errors
        return acc
      }, {})
    }
    //获取单个错误
    else {
      const names = Array.isArray(nes) ? nes : [ nes ]
      return names.filter(name => {
        return fields[name] && !!fieldsMeta[name].errors
      }).reduce((acc, name) => {
        acc[name] = fieldsMeta[name].errors
        return acc
      }, {})
    }
  }

  //清除字段
  clearFields = function(nes) {
    
    //全部清除
    if(nes === undefined) {
      Object.keys(this.fields).forEach(name => {
        delete this.fields[name]
        delete this.fieldsMeta[name]
      })
    }
    //部分清除
    else {

      const names = Array.isArray(nes) ? nes : [ nes ]
      names.forEach(name => {
        delete this.fields[name]
        delete this.fieldsMeta[name]
      })
    
    }

  }

  //获取meta
  getFieldMeta = function(name) {
    this.fieldsMeta[name] = this.fieldsMeta[name] || {}
    return this.fieldsMeta[name]
  }

  //设置meta
  setFieldMeta = function(name, meta) {
    this.fieldsMeta[name] = meta
  }

}

const instance = {}

export function createFieldsStore(name, options, fields) {
  if(typeof name !== 'string') throw new Error('必须给定一个名字与表单一一对应')
  if(!!!instance[name]) {
    instance[name] = new FieldsStore(name, options, fields)
  }
  return returnMethod(instance[name])
}

export function deleteFieldsStore(name) {
  delete instance[name]
}

export function getAllFieldsStoreName() {
  return Object.keys(instance)
}

function returnMethod(target) {
  const { form } = target
  return form.reduce((acc, method) => {
    acc[method] = target[method].bind(target)
    return acc
  }, {})
}