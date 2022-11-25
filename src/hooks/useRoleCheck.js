import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../context/Auth"

const useRoleCheck = (email) => {
    let [role, setRole] = useState('')
    let [banned, setBanned] = useState(false)
    let navigate = useNavigate()
    let [roleloading, setRoleLoading] = useState(true)
    let {user, logOut, setUser} = useContext(AuthContext)

    axios.get(`${process.env.REACT_APP_URL}/role-check/${email}`)
        .then(res => {
            setRole(res.data.role)
            if(res.data.banned){
                
                    toast.error('This email is Banned by admin.')

                logOut()
                .then(()=>{setUser(null)})
                .catch(()=>{setUser(null)})
                setBanned(true)
                navigate('/login')
            }
            setRoleLoading(false)
        })

    return {role, loading: roleloading, banned}
}

export default useRoleCheck