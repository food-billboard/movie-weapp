export const mapStateToProps = (_) => {
    const { news } = _.user
    return {
        news
    }
}
  
export const mapDispatchToProps = dispatch => ({   
    getNews: (query, init) => dispatch({type: 'user/getNews', query, init}),
    readNews: (id, date) => dispatch({type: 'user/readNews', id, date}),
    deleteNews: (id, date) => dispatch({type: 'user/deleteNews', id, date})
})