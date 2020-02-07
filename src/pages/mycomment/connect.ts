export const mapStateToProps = (_) => {
    const {comment} = _.user
    return {
        comment
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getUserComment: (query) => dispatch({type: 'user/getUserComment', query}),
    getUserInfo: () => dispatch({type: 'global/getUserInfo'})
})