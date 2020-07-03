export const mapStateToProps = (_) => {
    const { chat: { simpleList } } = _
    return {
        list: simpleList
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getMessageList: () => dispatch({ type: 'chat/getMessageList' }),
    readMessage: (id) => dispatch({ type: 'chat/readMessage', id }),
    deleteMessage: (id) => dispatch({ type: 'chat/deleteNews', id })
})