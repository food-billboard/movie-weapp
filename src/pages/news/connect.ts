export const mapStateToProps = (_) => {
    const { chat: { simpleList } } = _
    return {
        list: simpleList
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getMessageList: () => dispatch({ type: 'chat/getMessageList' }),
    readMessage: (id: string) => dispatch({ type: 'chat/readMessage', id }),
    deleteMessage: (id: string) => dispatch({ type: 'chat/deleteNews', id })
})