import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import SearchButton from '~components/searchbutton'
import { SYSTEM_PAGE_SIZE } from '~config'
import { getHot } from '~services'
import style from '~theme/style'
import { router, routeAlias } from '~utils'
import { noop } from 'lodash'

import './index.scss'

const HOT_HEIGHT = SYSTEM_PAGE_SIZE(35)

interface Hot {
  key_word: string,
  _id: string
}

interface IProps {
  disabled: boolean
  focus?: boolean
  hotShow?: false | number
  control?: (...args: Array<any>) => any
  confirm?: (...args: Array<any>) => any
}

interface IState {
  hot: Array<Hot>
}

export default class extends Component<IProps, IState> {

  public state: IState = {
    hot: []
  }

  public searchBarRef = Taro.createRef<SearchButton>()

  public componentDidMount = async () => await this.fetchData()

  public fetchData = async () => {
    const hot = await getHot()
    this.setState({
      hot
    })
  }

  //获取热搜信息
  public getHot = (id: string, _: any) => router.push(routeAlias.detail, { id })

  render() {
    const { hotShow = HOT_HEIGHT, disabled, confirm = noop, control = noop, focus = false } = this.props
    const { hot } = this.state

    return (
      <View>
        <SearchButton
          ref={this.searchBarRef}
          disabled={disabled}
          confirm={confirm}
          focus={focus}
          control={control}
        />
        {
          hot.length ?
            <View
              className='at-row hotsearch at-row__align--center'
              style={{ height: hotShow ? hotShow + 'px' : '0', ...style.backgroundColor('bgColor'), ...style.color('primary') }}>
              <View
                className='at-col at-col-1 hotlist title'
              >热搜</View>
              {
                hot.map((value) => {
                  const { key_word, _id: id } = value
                  return (
                    <View className='at-col at-col-2 hotlist'
                      key={id}>
                      <AtTag
                        customStyle={{ ...style.backgroundColor('disabled'), ...style.color('primary') }}
                        type={"primary"}
                        size={"normal"}
                        circle={true}
                        onClick={(event) => { this.getHot(id, event) }}
                      >{key_word}</AtTag>
                    </View>
                  )
                })
              }
            </View>
            : null
        }
      </View>
    )
  }
}