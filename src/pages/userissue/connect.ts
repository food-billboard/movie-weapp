export const mapStateToProps = (state) => {
  const { userInfo } = state.global
  return {
    id: userInfo.id
  }
}

export const mapDispatchToProps = dispatch => ({
  getIssue: (query) => dispatch({type: 'user/getIssue', query}),
  setIssue: (value) => dispatch({type: 'user/setIssue', value})
})