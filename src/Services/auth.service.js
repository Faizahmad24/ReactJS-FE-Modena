import axios from "axios"
export const login = (data, callback) => {
    axios.post('http://localhost:8000/api/login', data).then((res) => {
        callback(true, res.data)
    }).catch((error) => {
        callback(false, error.response.data.error)
    })
}