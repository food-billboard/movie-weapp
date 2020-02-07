export const mapStateToProps = (_) => {
    return {}
}
  
export const mapDispatchToProps = dispatch => ({   
    getUserComment: (query) => dispatch({type: 'user/getUserComment', query}),
    getUserInfo: () => dispatch({type: '获取用户信息'})
})