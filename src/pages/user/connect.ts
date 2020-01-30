export const mapStateToProps = (_) => {
    const {userInfo} = _.global
    return {
        id: userInfo.id
    }
}

export const mapDispatchToProps = dispatch => ({
    getUserInfo: (id) => dispatch({type: "global/getUserInfo", id})
})