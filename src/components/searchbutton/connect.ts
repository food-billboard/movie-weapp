export const mapStateToProps = (_) => {
    return {}
}
  
export const mapDispatchToProps = dispatch => ({   
  getHot: (count=3) => dispatch({type: 'movie/getHot', count}),
  fetchSearchPoint: (text) => dispatch({type: 'movie/fetchSearchPoint', text})
})