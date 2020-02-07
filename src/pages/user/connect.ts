export const mapStateToProps = (_) => {
    const {userInfo} = _.global
    return {
        id: userInfo.id
    }
}

export const mapDispatchToProps = dispatch => ({
    getUserInfo: (id) => dispatch({type: "global/getUserInfo", id}),
    getIsAttention: (user, mine) => dispatch({type: 'user/getIsAttention', user, mine}),
    toAttention: (user, mine, isAttention) => dispatch({type: 'user/toAttention', user, mine, isAttention})
})