export const mapStateToProps = (state) => {
  const { userInfo } = state.global
  const { issueSet } = state.user
  return {
    // id: userInfo.id,
    issueSet
  }
}

export const mapDispatchToProps = dispatch => ({
  editIssue: (form) => dispatch({type: 'user/editIssue', query: form}),
  sendIssue: (form) => dispatch({type: 'user/sendIssue', value: form}),
  setIssue: (value) => dispatch({type: 'user/setIssue', value}),
  getDetail: (id) => dispatch({type: 'movie/getDetail', id}),
  getLanguageList: (count=99) => dispatch({type: 'movie/getLanguageList', count}),
  getUserInfo: () => dispatch({type: 'global/getUserInfo'})
})