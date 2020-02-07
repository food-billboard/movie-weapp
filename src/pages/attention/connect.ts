export const mapStateToProps = (_) => {
    return {}
}
  
export const mapDispatchToProps = dispatch => ({   
    getAttention: (query) => dispatch({type: 'user/getAttention', query})
})