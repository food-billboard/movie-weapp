export const mapStateToProps = (_) => {
    const {comment} = _.movie
    const {userInfo} = _.global
    return {
        comment,
        id: userInfo.id
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getAttention: (id) => dispatch({type: 'user/getAttention', id}),
    publishComment: (comment, movie, user) => dispatch({type: 'user/publishComment', comment, movie, user}),
    publishUserComment: (id, comment, user, mine) => dispatch({type: "user/publishUserComment", id, comment, user, mine}),
    getComment: (id) => dispatch({type: "movie/getComment", id}),
    getCommentHeader: (id) => dispatch({type: "movie/getCommentHeader", id})
})