import axios from "axios"
import { useState } from "react"

const useRoleCheck = (email) => {
    let [role, setRole] = useState('')
    let [roleloading, setRoleLoading] = useState(true)

    axios.get(`${process.env.REACT_APP_URL}/role-check/${email}`)
        .then(res => {
            setRole(res.data.role)
            setRoleLoading(false)
        })

    return {role, loading: roleloading}
}

export default useRoleCheck