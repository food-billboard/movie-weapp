export const mapStateToProps = (state) => {
    const { type } = state.movie
    return {
        type
    }
}

export const mapDispatchToPrps = dispatch => ({
    getTypeDetail: (item) => dispatch({type: 'movie/getSwitchDetail', query: item})
})