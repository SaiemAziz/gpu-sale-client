import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/Auth';
import useRoleCheck from '../../../hooks/useRoleCheck';
import { Loading } from '../../../shared/components/Loading';

const MyBuyers = () => {
    let { user } = useContext(AuthContext);
    let { role, loading } = useRoleCheck(user?.email);

    const {
        data: buyers = [],
        refetch,
        isLoading,
      } = useQuery({
        queryKey: ["buyers"],
        queryFn: async () => {
          const res = await fetch(`${process.env.REACT_APP_URL}/my-buyers?email=${user?.email}`, {
            headers: {
                authtoken: localStorage.getItem('auth-token')
            }
          });
          const data = await res.json();
          return (data.result);
        },
      });

    if(loading || isLoading)  
    return <Loading size={80}/>

    if(role !== 'seller')
    return <Navigate to='/dashboard/default'/>



    return (
        <div className="px-5">
        <p className="text-4xl text-center my-10">All Buyers List: {buyers.length || 0}</p>
      <div className="overflow-x-scroll w-[400px] sm:w-[500px] md:w-[750px]">
        <table className="table table-compact w-full ">
          <thead>
            <tr>
              <th>SN.</th>
              <th>Picture</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, i) => (
              <tr key={i}>
                <th className="">{i + 1}</th>
                <td><img className="h-[50px] rounded-2xl" src={buyer?.photoURL} alt="" /></td>
                <td>{buyer?.displayName || 'No Name'}</td>
                <td>{buyer?.email || 'No Email'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default MyBuyers;