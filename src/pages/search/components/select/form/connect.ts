export const mapStateToProps = (state) => {
    return {}
}

export const mapDispatchToProps = dispatch => ({
   getType: (count=12) => dispatch({type: 'movie/getSwitch', count})
})