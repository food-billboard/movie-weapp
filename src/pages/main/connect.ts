export const mapStateToProps = (_) => {
    return {}
}
  
export const mapDispatchToProps = dispatch => ({
    getHot: (count=3) => dispatch({type: 'movie/getHot', count}),
    getSwiper: (count=5) => dispatch({type: 'movie/getSwiper', count}),
    getSwitch: (count=12) => dispatch({type: 'movie/getSwitch', count}),
    getDailyNew: (count=10) => dispatch({type: 'movie/getDailyNew', count}),
    getRank: (query) => dispatch({type: 'movie/getRank', query }),
    getNotice: () => dispatch({type: 'global/getNotice'}),

    getNews: (data) => dispatch({type: 'user/_getnews', data})
})