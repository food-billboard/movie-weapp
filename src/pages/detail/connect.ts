export const mapStateToProps = (_) => {
    const {detail} = _.movie
    const {userInfo} = _.global
    return {     
        detail,
        id: userInfo.id
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getDetail: (id) => dispatch({type: 'movie/detail', id}),
    sendRate: (rate, user, movie) => dispatch({type: 'user/rate', rate, user, movie})
})