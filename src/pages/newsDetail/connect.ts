import { EMediaType, ERoomType } from '~utils'

export const mapStateToProps = (_) => {
  const { chat: { simpleList } } = _
  return {
    list: simpleList
  }
}

export const mapDispatchToProps = dispatch => ({   
  getMessageDetail: (data: {id: string, startTime?: any, pageSize?:number, messaeId?: string }) => dispatch({type: 'chat/getNewsDetail', data}),
  joinOrCreateRoom: (data: { type: keyof typeof ERoomType, id: string, members: Array<string> }) => dispatch({ type: 'chat/joinOrCreateRoom', data }),
  postMessage: (data: { id: string, content: string, type: keyof typeof EMediaType, point_to?: string }) => dispatch({type: 'chat/postMessage', data}),
  leaveRoom: (id) => dispatch({ type: 'chat/leaveRoom', id })
})