export const mapStateToProps = (_) => {
  const { global: { userInfo } } = _
  return {
    userInfo
  }
}

export const mapDispatchToProps = dispatch => ({
  getUserInfo: (parasm = {}) => dispatch({ type: 'global/getUserInfo', ...parasm })
})