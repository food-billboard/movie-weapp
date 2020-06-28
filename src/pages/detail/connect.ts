export const mapStateToProps = (_) => {
    const { userInfo } = _.global
    return {     
        id: userInfo.id
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getDetail: (id) => dispatch({type: 'movie/getDetail', id}),
    getCommentSimple: (id) => dispatch({type: 'movie/getCommentSimple', movie: id}),
    comment: (value, movie, id) => dispatch({type: 'user/publishComment', value, movie, id}),
    getUserInfo: () => dispatch({type: 'global/getUserInfo'})
})