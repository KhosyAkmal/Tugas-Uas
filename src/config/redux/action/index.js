export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({type: 'CHANGE_USER', value: 'Khosy Akmal '})
    }, 2000)
}