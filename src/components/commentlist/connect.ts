export const mapStateToProps = (_) => {
  const { userInfo } = _.global
  return {
    id: userInfo.id
  }
}

export const mapDispatchToProps = dispatch => ({   
  like: (comment, user, mine) => dispatch({type: 'user/like', comment, user, mine}),
  publishUserComment: (id, comment, user, mine) => dispatch({type: "user/publishUserComment", id, comment, user, mine}),
})