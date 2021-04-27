export const mapStateToProps = (_) => ({})

export const mapDispatchToProps = (dispatch) => ({
  getUserInfo: ({ action, prompt, unloginAction }) => dispatch({ type: 'global/getUserInfo', action, prompt, unloginAction })
})