export const mapStateToProps = (_: any) => {
  return {}
}

export const mapDispatchToProps = dispatch => ({   
  initData: (params) => dispatch({ type: 'issue/initData', ...params }),
  fetchData: () => dispatch({ type: 'issue/fetchData' }),
})
