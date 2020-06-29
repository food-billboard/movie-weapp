export const mapStateToProps = ( state ) => {
    const { global: { userInfo } } = state
    return {
        userInfo
    }
}

export const mapDispatchToProps = dispatch => ({
    getUserInfo: () => dispatch({type: 'global/getUserInfo'}),
})