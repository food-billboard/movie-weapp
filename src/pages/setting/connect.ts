export const mapStateToProps = (_) => {
    const {appInfo, userInfo } = _.global
    return {
        id: userInfo.id,
        appInfo
    }
}
export const mapDispatchToProps = dispatch => ({
    logout: (id) => dispatch({type: "global/sendLogout", id}),
    getAppInfo: () => dispatch({type: 'global/getAppInfo'}),
    getUserInfo: () => dispatch({type: 'global/getUserInfo'}),
    feedback: (user, value) => dispatch({type: 'user/feedback', user, value}),
})