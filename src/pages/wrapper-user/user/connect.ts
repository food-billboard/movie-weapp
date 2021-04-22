export const mapStateToProps = (_) => ({})

export const mapDispatchToProps = dispatch => ({
    getUserInfo: ({ prompt=true }={}) => dispatch({ type: 'global/getUserInfo', prompt })
})