export const mapStateToProps = (state) => {
    return {}
}

export const mapDispatchToPrps = dispatch => ({
    getTypeDetail: (item) => dispatch({type: 'movie/getSwitchDetail', query: item}),
    getSwitch: (count=12) => dispatch({ type: 'movie/getSwitch', count })
})