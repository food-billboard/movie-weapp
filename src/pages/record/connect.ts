export const mapStateToProps = (_) => {
    const {userInfo} = _.global
    return {
        id: userInfo.id
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getRecord: (query) => dispatch({type: 'user/getRecord', query})
})