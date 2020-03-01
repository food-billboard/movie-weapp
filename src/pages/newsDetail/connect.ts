export const mapStateToProps = (_) => {
  const { userInfo } = _.global
  return {
    userInfo
  }
}

export const mapDispatchToProps = dispatch => ({   
  getNewsDetail: (query) => dispatch({type: 'user/getNewsDetail', query}),
  sendNews: (data) => dispatch({type: 'user/sendNews', data})
})