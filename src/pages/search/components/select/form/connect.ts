export const mapStateToProps = (state) => {
    const { type } = state.movie
    return {
        type
    }
}

export const mapDispatchToProps = dispatch => ({
    factorSelect: (formData) => dispatch({type: 'movie/factorSelect', formData})
})