export const mapStateToProps = (state: any) => {
  const { issue: { selectActor, selectDirector, selectDistrict } } = state
  return {
    selectDistrict,
    selectDirector,
    selectActor
  }
}

export const mapDispatchToProps = dispatch => ({   
  editDirector: (data) => dispatch({ type: 'issue/editDirector', data }),
  editDistrict: (data) => dispatch({ type: 'issue/editDistrict', data }),
  editActor: (data) => dispatch({ type: 'issue/editActor', data }),
})
