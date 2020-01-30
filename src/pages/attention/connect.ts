export const mapStateToProps = (_) => {
    return {}
}
  
export const mapDispatchToProps = dispatch => ({   
    getAttention: (id) => dispatch({type: 'user/getAttention', id})
})