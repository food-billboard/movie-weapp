export const mapStateToProps = (state) => {
  return {}
}

export const mapDispatchToProps = dispatch => ({
  getAreaList: (count=99) => dispatch({type: 'movie/getAreaList', count}),
  getCountryList: (count=99) => dispatch({type: 'movie/getCountryList', count}),
  getActorList: (count=99) => dispatch({type: 'movie/getActorList', count}),
  getDirectorList: (count=99) => dispatch({type: 'movie/getDirectorList', count}),
  getSwitch: (count=99) => dispatch({type: 'movie/getSwitch', count})
})