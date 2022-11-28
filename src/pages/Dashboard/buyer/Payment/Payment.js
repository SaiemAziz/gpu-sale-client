
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../../context/Auth';
import useRoleCheck from '../../../../hooks/useRoleCheck';
import { useTitle } from '../../../../hooks/useTitle';
import { Loading } from '../../../../shared/components/Loading';
import CardPayment from './CardPayment';

const Payment = () => {
    useTitle('Payment')
    let [productLoad, setProductLoad] = useState(true)
    let [p, setP] = useState({})
    let location = useLocation()
    let id = location.pathname.replace('/dashboard/payment/','')
    let { user } = useContext(AuthContext);
    let { role, loading } = useRoleCheck(user?.email);
    // fteching product info
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_URL}/single-product?email=${user?.email}&id=${id}`,{
            headers : {
                authtoken : localStorage.getItem('auth-token')
            }
        }).then(res => res.json())
        .then(data => {
            setP(data.product)
            setProductLoad(false)
        })
    },[user, id])
    
    if(loading || productLoad)
    return <Loading size={80}/>
    if(role !== 'buyer')
    return <Navigate to='/dashboard/default'/>


    return (
        <div className='gap-5 grid grid-cols-1 md:grid-cols-2 text-center py-10 overf'>
           <div className='flex p-5 flex-col justify-between'>
                <h1 className='text-3xl'>You are buying </h1>
                <h1 className='text-4xl italic font-semibold text-info m-3 px-5'>{p?.product?.name}</h1>
                <img className='max-w-xs mx-auto rounded-2xl shadow-xl' src={p?.product?.photoURL} alt="" />
           </div>
           <div className='p-5'>
                <h1 className='text-4xl'>Buyer Information</h1>
                <form className="grid sm:grid-cols-2 grid-cols-1 gap-5 p-5 text-left">
                <h1 className="my-auto text-xl">Category</h1>
                    <input
                    className="input input-info"
                    required
                    name="category"
                    value={p?.product?.category?.replaceAll('-',' ').toUpperCase()}
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
                    value={p?.product?.resalePrice+' $'}
                    name="address"
                    type="text"
                    />
                </form> 
           </div>
           <div className='md:col-span-2'>
            <CardPayment p={p}/>
           </div>
        </div>
    );
};

export default Payment;