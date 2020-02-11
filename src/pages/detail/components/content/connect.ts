export const mapStateToProps = (_) => {
    const {userInfo} = _.global
    return {     
        id: userInfo.id
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    sendStore: (user, movie) => dispatch({ type: 'user/sendStore', user, movie }),
    getUserInfo: () => dispatch({type: 'global/getUserInfo'})
})