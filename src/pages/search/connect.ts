import { searchQuery } from './interface'

export const mapStateToProps = (_) => {
    return {}
}
  
export const mapDispatchToProps = dispatch => ({   
    getHot: (count=3) => dispatch({type: 'movie/getHot', count}),
    factorySearch: (query: searchQuery) => dispatch({type: 'movie/factorySearch', factor: query})
})