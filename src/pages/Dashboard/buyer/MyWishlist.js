import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth';
import useRoleCheck from '../../../hooks/useRoleCheck';
import { Loading } from '../../../shared/components/Loading';

const MyWishlist = () => {
    let { user } = useContext(AuthContext);
    let { role, loading } = useRoleCheck(user?.email);
    if(loading)
    return <Loading size={80}/>

    if(role !== 'buyer')
    return <Navigate to='/dashboard/default'/>
    return (
        <div>
            My Wishlist
        </div>
    );
};

export default MyWishlist;