export const mapStateToProps = (_) => {
  return {}
}

export const mapDispatchToProps = dispatch => ({   
  getUserFans: (query) => dispatch({type: 'user/getUserFans', query})
})