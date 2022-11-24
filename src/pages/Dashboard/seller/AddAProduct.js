import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth';
import useRoleCheck from '../../../hooks/useRoleCheck';
import { Loading } from '../../../shared/components/Loading';

const AddAProduct = () => {
    let { user } = useContext(AuthContext);
    let { role, loading } = useRoleCheck(user?.email);
    if(loading)
    return <Loading size={80}/>

    if(role !== 'seller')
    return <Navigate to='/dashboard/default'/>
    return (
        <div>
            Add A Product
        </div>
    );
};

export default AddAProduct;