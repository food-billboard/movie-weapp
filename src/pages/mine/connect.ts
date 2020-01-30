export const mapStateToProps = (_) => {
    const {userInfo} = _.global
    return {
        id: userInfo.id,
        info: userInfo
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getUserInfo: (id) => dispatch({type: 'global/getUserInfo', id}),
    // getNews: (id) => dispatch({type: '获取通知信息', id}),
    // getRecord: (id) => dispatch({type: '获取收藏信息', id})
})