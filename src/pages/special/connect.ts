export const mapStateToProps = (_) => {
  return {_}
}
export const mapDispatchToProps = dispatch => ({
  getSpecial: (id) => dispatch({type: 'movie/getSpecial', id})
})