import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import useRoleCheck from '../../hooks/useRoleCheck';

const Dashboard = () => {
    let {user} = useContext(AuthContext)

    let {role, loading} = useRoleCheck(user.email)
    return (
        <div>
            
        </div>
    );
};

export default Dashboard;