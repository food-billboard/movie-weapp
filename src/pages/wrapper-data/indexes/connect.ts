export const mapStateToProps = (state: any) => {
  const { issue: { actor, director, district, selectActor, selectDirector, selectDistrict } } = state
  return {
    actor,
    director,
    district,
    selectDistrict,
    selectDirector,
    selectActor
  }
}

export const mapDispatchToProps = dispatch => ({   
  fetchActor: () => dispatch({ type: 'issue/fetchActor' }),
  fetchDirector: () => dispatch({ type: 'issue/fetchDirector' }),
  fetchDistrict: () => dispatch({ type: 'issue/fetchDistrict' }),
  editDirector: (data) => dispatch({ type: 'issue/editDirector', data }),
  editDistrict: (data) => dispatch({ type: 'issue/editDistrict', data }),
  editActor: (data) => dispatch({ type: 'issue/editActor', data }),
})
