export const mapStateToProps = (_) => {}
  
export const mapDispatchToProps = dispatch => ({
    // sendSMS: (mobile) => dispatch({type: 'global/sendSMS', mobile }),     
    register: ({ mobile, username, password, uid }) => dispatch({ type: 'global/register', mobile, username, password, uid })
})