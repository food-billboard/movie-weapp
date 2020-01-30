export const mapStateToProps = (_) => {
    const {appInfo, userInfo} = _.global
    return {
        id: userInfo.id,
        appInfo
    }
}
export const mapDispatchToProps = dispatch => ({
    logout: (id) => dispatch({type: "global/logout", id}),
    getAppInfo: () => dispatch({type: 'global/getAppInfo'})
})