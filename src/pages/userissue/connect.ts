export const mapStateToProps = (_) => {}

export const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch({ type: 'global/getUserInfo' }),
})