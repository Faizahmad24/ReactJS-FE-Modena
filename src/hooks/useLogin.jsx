import { useEffect, useState } from "react"
export const useLogin = () => {
    // for get token and checking validation token from auth.service
    const [userName, setUserName] = useState("")
    useEffect(() => {
        const token = localStorage.getItem('email')
            if(token) {
                setUserName(token)
            } else {
                window.location.href = "/"
            }
        }, [])

        return userName
}