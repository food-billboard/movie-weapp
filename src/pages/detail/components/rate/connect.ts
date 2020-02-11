export const mapStateToProps = (_) => {
  const {userInfo} = _.global
  return {     
      id: userInfo.id
  }
}

export const mapDispatchToProps = dispatch => ({   
  sendRate: (rate, user, movie) => dispatch({type: 'user/sendRate', value: rate, user, movie}),
  getRate: (movie) => dispatch({type: 'movie/getRate', movie}),
  getUserInfo: () => dispatch({type: 'global/getUserInfo'})
})