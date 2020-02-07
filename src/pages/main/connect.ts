export const mapStateToProps = (_) => {
    const { hot, rank } = _.movie
    return {
        hot, 
        rank
    }
}
  
export const mapDispatchToProps = dispatch => ({
    getHot: () => dispatch({type: 'movie/getHot'}),
    getSwiper: (count=5) => dispatch({type: 'movie/getSwiper', count}),
    getSwitch: (count=12) => dispatch({type: 'movie/getSwitch', count}),
    getDailyNew: (count=10) => dispatch({type: 'movie/getDailyNew', count}),
    getRank: (rank='0') => dispatch({type: 'movie/getRank', rank})   //后端排行榜的id
})