export const mapStateToProps = (_) => {
  return {_}
}
export const mapDispatchToProps = dispatch => ({
  getSpecial: (query) => dispatch({type: 'movie/getSpecial', query})
})