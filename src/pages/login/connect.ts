export const mapStateToProps = (_) => {
    return {}
}
  
export const mapDispatchToProps = dispatch => ({
    sendSMS: (mobile) => dispatch({type: 'global/sendSMS', mobile }),   
    sendUserLogon: (data) => dispatch({type: 'global/sendUserLogon', data }),  
    getUserInfo: () => dispatch({type: 'global/getUserInfo'}) 
})