import axios from "axios"
export const register = (data, callback) => {

    axios.post('http://localhost:8000/api/register', data).then((res) => {
        callback(true, res.data)
    }).catch((error) => {
        if(error.response.data.email){
            callback(false, error.response.data.email)
        } else {
            callback(false, error.response.data.password)
        }
    })
}