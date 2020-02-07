export const mapStateToProps = (_) => {
    const {comment} = _.movie
    const {userInfo} = _.global
    return {
        comment,
        id: userInfo.id
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getComment: (query) => dispatch({type: "movie/getComment", query}),
    getUserInfo: () => dispatch({type: 'global/getUserInfo'}),
    getCommentHeader: (id) => dispatch({type: "movie/getCommentHeader", id}),
    publishUserComment: (id, comment, user, mine) => dispatch({type: "user/publishUserComment", commentId: id, content: comment, user, mine}),
    publishComment: (comment, movie, user) => dispatch({type: 'user/publishComment', value: comment, movie, user}),
})