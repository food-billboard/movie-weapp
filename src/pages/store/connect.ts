export const mapStateToProps = (_) => {
  const {userInfo} = _.global
  return {
      id: userInfo.id
  }
}

export const mapDispatchToProps = dispatch => ({   
  getStore: (query) => dispatch({type: 'user/getStore', query})
})