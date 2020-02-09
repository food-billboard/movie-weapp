export const mapStateToProps = (_) => {
  const { userInfo } = _.global
  return {
    id: userInfo.id
  }
}

export const mapDispatchToProps = dispatch => ({   
  getUserInfo: () => dispatch({type: 'global/getuserInfo'}),
  like: (comment, user, mine) => dispatch({type: 'user/like', comment, user, mine}),
})