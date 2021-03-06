export const mapStateToProps = (_) => {
    const { global: { userInfo } } = _
    return {
        userInfo
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getUserInfo: () => dispatch({type: 'global/getUserInfo'})
})