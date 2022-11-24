import axios from "axios"
import { useState } from "react"

const useRoleCheck = (email) => {
    let [role, setRole] = useState('')
    axios.get(`${process.env.REACT_APP_URL}/role-check/${email}`)
    .then(res => setRole(res.data.role))
    return role
}

export default useRoleCheck