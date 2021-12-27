export const mapStateToProps = (_) => ({})
  
export const mapDispatchToProps = dispatch => ({   
    getUserInfo: (params={}) => dispatch({type: 'global/getUserInfo', ...params}),
})