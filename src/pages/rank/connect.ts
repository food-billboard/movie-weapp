export const mapStateToProps = (_) => {
  return {}
}

export const mapDispatchToProps = dispatch => ({
  getRank: (query) => dispatch({type: 'movie/getRank', query}),   //后端排行榜的id
  getRankType: (count=6) => dispatch({ type: 'movie/getRankType', count })
})