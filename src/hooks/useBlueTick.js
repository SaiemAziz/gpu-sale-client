import axios from 'axios';
import {useState} from 'react'

const useBlueTick = (email) => {
    let [blueTick, setBlueTick] = useState(false)
    let [verifyLoading, setVerifyLoading] = useState(true)

    axios.get(`${process.env.REACT_APP_URL}/verified-check/${email}`)
        .then(res => {
            setBlueTick(res.data.verified)
            setVerifyLoading(false)
        })
    
    return {blueTick, verifyLoading}
};

export default useBlueTick;