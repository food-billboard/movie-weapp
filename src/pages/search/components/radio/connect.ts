export const mapStateToProps = (_) => {
    return {}
}
  
export const mapDispatchToProps = dispatch => ({   
   getOrderList: () => dispatch({type: 'movie/getOrderList'})
})