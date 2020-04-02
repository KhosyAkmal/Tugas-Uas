import firebase from '../../firebase';

export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({type: 'CHANGE_USER', value: 'Khosy Akmal '})
    }, 2000)
}

export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: 'CHANGE_ISLOADING', value: true})

        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
            console.log('success: ', res);
            dispatch({type: 'CHANGE_ISLOADING', value: false})
            resolve(true)
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            dispatch({type: 'CHANGE_ISLOADING', value: false})
            resolve(false)
          })
    })
}

export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
            dispatch({type: 'CHANGE_ISLOADING', value: true})
        
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                console.log('success: ', res);
                const dataUser = {
                    email : res.user.email,
                    uid : res.user.uid,
                    emailVerified: res.user.emailVerified
                }
                dispatch({type: 'CHANGE_ISLOADING', value: false})
                dispatch({type: 'CHANGE_ISLOGIN', value: true})
                dispatch({type: 'CHANGE_USER', value: dataUser})
                resolve(true)
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                dispatch({type: 'CHANGE_ISLOADING', value: false})
                dispatch({type: 'CHANGE_ISLOGIN', value: false})
                reject(false)
            })
        })
}