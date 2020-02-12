export const mapStateToProps = (state) => {
  const { userInfo } = state.global
  const { issueSet } = state.user
  return {
    id: userInfo.id,
    issueSet
  }
}

export const mapDispatchToProps = dispatch => ({
  editIssue: (form) => dispatch({type: 'user/editIssue', form}),
  sendIssue: (form) => dispatch({type: 'user/sendIssue', form}),
  getDetail: (id) => dispatch({type: 'movie/getDetail', id})
})