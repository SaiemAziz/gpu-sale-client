
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../../context/Auth';
import useRoleCheck from '../../../../hooks/useRoleCheck';
import { useTitle } from '../../../../hooks/useTitle';
import { Loading } from '../../../../shared/components/Loading';

const Payment = () => {
    useTitle('Payment')
    let [p, setP] = useState({})
    let location = useLocation()
    let id = location.pathname.replace('/dashboard/payment/','')
    let [payLoading, setPayLoading] = useState(false)
    let { user } = useContext(AuthContext);
    let { role, loading } = useRoleCheck(user?.email);
    
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_URL}/single-product?email=${user?.email}&id=${id}`,{
            headers : {
                authtoken : localStorage.getItem('auth-token')
            }
        }).then(res => res.json())
        .then(data => setP(data.product))
    },[user, id])
    
    if(loading)
    return <Loading size={80}/>
    if(role !== 'buyer')
    return <Navigate to='/dashboard/default'/>

    

    let checkedForm = async e => {
        e.preventDefault()
        setPayLoading(true)

    }

    return (
        <div className='my-10 gap-5 grid grid-cols-1 md:grid-cols-2 text-center py-10'>
           <div>
                <h1 className='text-2xl'>You are buying </h1>
                <h1 className='text-4xl italic font-semibold text-info my-3'>{p?.name}</h1>
                <img className='max-w-xs mx-auto rounded-2xl shadow-xl' src={p?.photoURL} alt="" />
           </div>
           <div>
                <h1 className='text-4xl'>Buyer Information</h1>
                <form onSubmit={checkedForm} className="grid sm:grid-cols-2 grid-cols-1 gap-5 p-5 text-left">
                <h1 className="my-auto text-xl">Category</h1>
                    <input
                    className="input input-info"
                    required
                    name="category"
                    value={p?.category?.replaceAll('-',' ').toUpperCase()}
                    type="text"
                    disabled
                    />
                <h1 className="my-auto text-xl">Name</h1>
                    <input
                    className="input input-info"
                    required
                    name="buyerName"
                    value={user?.displayName}
                    type="text"
                    disabled
                    />
                <h1 className="my-auto text-xl">Email</h1>
                    <input
                    className="input input-info"
                    required
                    name="email"
                    value={user?.email}
                    type="text"
                    disabled
                    />
                <h1 className="my-auto text-xl">Phone no.</h1>
                    <input
                    className="input input-info"
                    required
                    disabled
                    value={p?.booked?.buyerMobileNo}
                    name="mobileNo"
                    type="number"
                    />
                <h1 className="my-auto text-xl">Meeting Address</h1>
                    <input
                    className="input input-info"
                    required
                    disabled
                    value={p?.booked?.address}
                    name="address"
                    type="text"
                    />
                <h1 className="my-auto text-xl">Price</h1>
                    <input
                    className="input input-info"
                    required
                    disabled
                    value={p?.resalePrice+' $'}
                    name="address"
                    type="text"
                    />
                </form> 
           </div>
           <div className='md:col-span-2'>

           </div>
        </div>
    );
};

export default Payment;