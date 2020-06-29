export const mapStateToProps = (_) => {
    return {}
}
  
export const mapDispatchToProps = dispatch => ({
    // sendSMS: (mobile) => dispatch({type: 'global/sendSMS', mobile }),   
    signin: ( { mobile, password, uid } ) => dispatch({ type: 'global/signin', mobile, password, uid } )
})