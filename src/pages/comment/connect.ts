export const mapStateToProps = (_) => {
    const {comment} = _.movie
    const {userInfo} = _.global
    return {
        comment,
        userInfo
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getUserInfo: () => dispatch({type: 'user/getUserInfo'}),
    getAttention: (id) => dispatch({type: 'user/getAttention', id}),
    like: (user, comment) => dispatch({type: 'user/like', user, comment}),
    publishComment: (comment, user) => dispatch({type: 'user/publishComment', comment, user}),
    publishUserComment: (comment, user, mine) => dispatch({type: "user/publishUserComment", comment, user, mine}),
    getComment: (id) => dispatch({type: "movie/getComment", id}),
    getCommentHeader: (id) => dispatch({type: "movie/getCommentHeader", id})
})