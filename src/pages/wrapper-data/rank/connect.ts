export const mapStateToProps = (_) => {
  const { global: { userInfo } } = _
  return {
    userInfo
  }
}

export const mapDispatchToProps = dispatch => ({
  getUserInfo: (params = {}) => dispatch({ type: 'global/getUserInfo', ...params })
})