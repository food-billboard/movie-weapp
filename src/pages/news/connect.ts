export const mapStateToProps = (_) => {
    return {}
}
  
export const mapDispatchToProps = dispatch => ({   
    getUserComment: (id) => dispatch({type: 'user/getUserComment', id}),
    // getUserInfo: (id) => dispatch({type: '获取用户信息', id})
})