export const mapStateToProps = (_) => {
  const {comment} = _.movie
  const {userInfo} = _.global
  return {
      comment,
      // id: userInfo.id
  }
}

export const mapDispatchToProps = dispatch => ({   
  publishUserComment: (id, value, user, mine) => dispatch({type: "user/publishUserComment", commentId: id, value, user, mine}),
  getCommentDetail: (query) => dispatch({type: "movie/getCommentDetail", query}),
  getUserInfo: () => dispatch({type: 'global/getUserInfo'}),
})