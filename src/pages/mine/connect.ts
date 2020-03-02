export const mapStateToProps = (_) => {
    const { userInfo } = _.global
    const { hasNews } = _.user
    return {
        id: userInfo.id,
        hasNews
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getUserInfo: () => dispatch({type: 'global/getUserInfo' })
})