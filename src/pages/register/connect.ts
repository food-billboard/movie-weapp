export const mapStateToProps = (_) => {
    return {}
}
  
export const mapDispatchToProps = dispatch => ({
    sendSMS: (mobile) => dispatch({type: 'global/sendSMS', mobile }),     
    sendNewUser: (data) => dispatch({type: 'global/sendNewUser', data})
})