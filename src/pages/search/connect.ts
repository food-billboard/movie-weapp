import { searchQuery } from './interface'

export const mapStateToProps = (_) => {
    return {}
}
  
export const mapDispatchToProps = dispatch => ({   
    getHot: () => dispatch({type: 'movie/getHot'}),
    factorySearch: (query: searchQuery) => dispatch({type: 'movie/factorySearch', query})
})