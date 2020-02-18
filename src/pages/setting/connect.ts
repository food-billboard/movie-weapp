export const mapStateToProps = (_) => {
    const {appInfo, userInfo, colorStyle} = _.global
    return {
        id: userInfo.id,
        appInfo,
        colorStyle
    }
}
export const mapDispatchToProps = dispatch => ({
    logout: (id) => dispatch({type: "global/sendLogout", id}),
    getAppInfo: () => dispatch({type: 'global/getAppInfo'}),
    getUserInfo: () => dispatch({type: 'global/getUserInfo'}),
    feedback: (user, value) => dispatch({type: 'user/feedback', user, value}),
    setColorStyle: (status) => dispatch({type: 'global/setColorStyle', status})
})