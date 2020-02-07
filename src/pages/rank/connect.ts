export const mapStateToProps = (_) => {
  return {}
}

export const mapDispatchToProps = dispatch => ({
  getRank: (query) => dispatch({type: 'movie/getRank', query}),   
  getRankType: (count=6) => dispatch({ type: 'movie/getRankType', count })
})