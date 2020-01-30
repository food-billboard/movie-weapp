export const mapStateToProps = (_) => {
    const { hot, search, type } = _.movie
    return {
        hot,
        search,
        type
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getHot: () => dispatch({type: 'movie/getHot'}),
    search: (value) => dispatch({type: 'movie/factorSelect', value}),
    factorSelect: (value) => dispatch({type: 'movie/factorSelect', value}),
    sort: (value) => dispatch({type: 'movie/sort', value})
})