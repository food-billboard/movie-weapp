export const mapStateToProps = (_) => ({})
  
export const mapDispatchToProps = dispatch => ({
    sendSMS: (email, emailType) => dispatch({type: 'global/sendSMS', email, emailType }),     
    register: ({ mobile, username, password, uid, captcha, email }) => dispatch({ type: 'global/register', mobile, username, password, uid, captcha, email })
})