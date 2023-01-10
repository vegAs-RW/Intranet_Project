import axios from "axios";

export const GET_USER = "GET_USER";
export const LOG_USER = "LOG_USER"

export const getUser= (uid) => {
    return (dispatch) => {
        return axios
            .get()
    }
}

export const logUser = () => {
    return(dispatch) => {
        return axios({
            method: "post",
            url: `http://localhost:9000/api/login`,
            data: {
                email,
                password
            }
        })
        .then((res) => {
            console.log(res)
            const {success} = res.data
            console.log(success);
            try {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem("userId", res.data.user.id)
            }  catch {
                console.log('raté')
            }  
        })
        .then((res) => {
            dispatch({type: LOG_USER, payload: res.data})
            window.location ='/'; /* Mettre la localisation de la route pour affichage de la page random*/
        })
        .catch((err) => {
            console.log(err);
        })
    }
}