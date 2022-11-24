import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth';
import { useQuery } from "@tanstack/react-query";
import useRoleCheck from '../../../hooks/useRoleCheck';
import { Loading } from '../../../shared/components/Loading';
import { toast } from 'react-toastify';
const AllSellers = () => {
    let { user } = useContext(AuthContext);
    let { role, loading } = useRoleCheck(user?.email);
    
    const {
        data: sellers = [],
        refetch,
        isLoading,
      } = useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
          const res = await fetch(`${process.env.REACT_APP_URL}/all-sellers?email=${user?.email}`, {
            headers: {
                authtoken: localStorage.getItem('auth-token')
            }
          });
          const data = await res.json();
          return (data.result);
        },
      });
    
    
    if(loading)
    return <Loading size={80}/>

    if(role !== 'admin')
    return <Navigate to='/dashboard/default'/>
    
    
    let deleteSeller = (id) => {
        let surity = window.confirm('Want to delete this seller?')
        if(!surity)
        return;

        fetch(`${process.env.REACT_APP_URL}/all-sellers?email=${user?.email}&id=${id}`, {
            method: 'DELETE',
            headers: {
                authtoken: localStorage.getItem('auth-token')
            }
          }).then(res => res.json())
          .then(data => {
            if(data.result.acknowledged)
            {
                toast.success('Seller Successfully Deleted')
                refetch()
            }
          })
    }

    let verifySeller = (id) => {
        fetch(`${process.env.REACT_APP_URL}/all-sellers?email=${user?.email}&id=${id}`, {
            method: 'PUT',
            headers: {
                authtoken: localStorage.getItem('auth-token')
            }
          }).then(res => res.json())
          .then(data => {
            if(data.result.acknowledged)
            {
                toast.success('Seller Successfully Verified')
                refetch()
            }
          })
    }
    
    
    return (
        <div className="px-5">
        <p className="text-4xl text-center my-10">All Sellers List: {sellers.lenght || 0}</p>
      <div className="overflow-x-scroll w-[400px] sm:w-[500px] md:w-[750px]">
        <table className="table table-compact w-full ">
          <thead>
            <tr>
              <th>SN.</th>
              <th>Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, i) => (
              <tr key={i}>
                <th className="">{i + 1}</th>
                <td><img className="h-[50px] rounded-2xl" src={seller?.photoURL} alt="" /></td>
                <td>{seller?.displayName || 'No Name'}</td>
                <td>{seller?.email || 'No Email'}</td>
                <td className='flex flex-col gap-2'>
                    
                        {
                          !seller.verified ?
                          <button className="btn btn-xs btn-info text-xs" onClick={()=>verifySeller(seller?._id)}
                            >Verify
                          </button> : 
                          <p className='text-center font-bold text-success'>Verified</p> 
                        }
                    
                        <button className="btn btn-xs btn-error text-xs" onClick={()=>deleteSeller(seller?._id)}
                            >Remove
                        </button> 
                    
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default AllSellers;