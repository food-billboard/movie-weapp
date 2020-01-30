export const mapStateToProps = (_) => {
    const {comment} = _.user
    return {
        comment
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getUserComment: (id) => dispatch({type: 'user/getUserComment', id}),
    // getUserInfo: (id) => dispatch({type: '获取用户信息', id})
})