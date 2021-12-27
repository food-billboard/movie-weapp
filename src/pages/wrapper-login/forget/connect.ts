export const mapStateToProps = (_) => ({})

export const mapDispatchToProps = dispatch => ({
  sendSMS: (email, emailType) => dispatch({ type: 'global/sendSMS', email, emailType }),
  forget: ({ password, captcha, email }) => dispatch({ type: 'global/forget', password, captcha, email })
})