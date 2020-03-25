export const mapStateToProps = (_) => {
    const {userInfo} = _.global
    return {
        // id: userInfo.id
    }
}

export const mapDispatchToProps = dispatch => ({
    getUserInfo: () => dispatch({type: "global/getUserInfo"}),
    getIsAttention: (user, mine) => dispatch({type: 'user/getIsAttention', user, mine}),
    toAttention: (user, mine, isAttention=false) => dispatch({type: 'user/toAttention', user, mine, isAttention})
})