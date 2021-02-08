import { useHistory } from "react-router-dom"


export const Logout = () => {
    const logout = () => { localStorage.clear() }
    const history = useHistory()
    const handleLogout = (e) => {
        e.preventDefault()

        logout()
        history.push("/")


        
    }
    return handleLogout
}