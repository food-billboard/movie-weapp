export const mapStateToProps = (_) => {
    const { userInfo } = _.global
    const { hasNews } = _.user
    return {
        userInfo,
        hasNews
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getUserInfo: () => dispatch({type: 'global/getUserInfo' })
})