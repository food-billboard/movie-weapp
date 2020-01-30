export const mapStateToProps = (_) => {
    const {userInfo} = _.global
    return {
        id: userInfo.id
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getRecord: (id) => dispatch({type: 'user/getRecord', id})
})