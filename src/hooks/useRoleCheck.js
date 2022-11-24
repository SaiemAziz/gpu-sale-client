import axios from "axios"
import { useState } from "react"

const useRoleCheck = (email) => {
    let [role, setRole] = useState('')
    let [loading, setLoading] = useState(true)

    axios.get(`${process.env.REACT_APP_URL}/role-check/${email}`)
        .then(res => {
            setRole(res.data.role)
            setLoading(false)
        })

    return {role, loading}
}

export default useRoleCheck