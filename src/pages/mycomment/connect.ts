export const mapStateToProps = (_) => {
    const { userInfo } = _.global
    return {
        id: userInfo.id
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getUserComment: (query) => dispatch({type: 'user/getUserComment', query}),
    getUserInfo: () => dispatch({type: 'global/getUserInfo'}),
    publishUserComment: (id, value, user, mine) => dispatch({type: "user/publishUserComment", id, value, user, mine})
})