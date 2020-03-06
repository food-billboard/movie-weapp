export const mapStateToProps = (state) => {
    return {}
}

export const mapDispatchToProps = dispatch => ({
    getLanguageList: (count=99) => dispatch({type: 'movie/getLanguageList', count})
})