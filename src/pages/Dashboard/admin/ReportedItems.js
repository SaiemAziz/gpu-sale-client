import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth';
import useRoleCheck from '../../../hooks/useRoleCheck';
import { Loading } from '../../../shared/components/Loading';
const ReportedItems = () => {
    let { user } = useContext(AuthContext);
    let { role, loading } = useRoleCheck(user?.email);
    if(loading)
    return <Loading size={80}/>

    if(role !== 'admin')
    return <Navigate to='/dashboard/default'/>
    return (
        <div>
            Reported Items    
        </div>
    );
};

export default ReportedItems;   