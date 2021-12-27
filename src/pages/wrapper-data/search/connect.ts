import { searchQuery } from './interface'

export const mapStateToProps = (_) => {
    return {}
}
  
export const mapDispatchToProps = dispatch => ({   
    factorySearch: (query: searchQuery) => dispatch({type: 'movie/factorySearch', factor: query}),
    fetchSearchPoint: (text) => dispatch({type: 'movie/fetchSearchPoint', text})
})