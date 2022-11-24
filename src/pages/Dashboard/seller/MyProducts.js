import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth';
import useRoleCheck from '../../../hooks/useRoleCheck';
import { Loading } from '../../../shared/components/Loading';

const MyProducts = () => {
    let { user } = useContext(AuthContext);
    let { role, loading } = useRoleCheck(user?.email);

    if(loading)
    return <Loading size={80}/>

    if(role !== 'seller')
    return <Navigate to='/dashboard/default'/>
    return (
        <div className='px-5'>
            <div className="overflow-x-scroll w-[400px] sm:w-[500px] md:w-[750px]">
  <table className="table table-compact w-full ">
    <thead>
      <tr>
        <th>SN.</th>
        <th>Picture</th> 
        <th>Name</th> 
        <th>Resale Price</th> 
        <th>Post Time</th>
        <th>Years Used</th>
        <th>Option</th>
      </tr>
    </thead> 
    <tbody>
      <tr>
        <td className='fixed'>1</td>
        <td>Cy Ganderton</td> 
        <td>Quality Control Specialist</td> 
        <td>Littel, Schaden and Vandervort</td> 
        <td>Canada</td> 
        <td>12/16/2020</td> 
        <td><button className='btn btn-xs btn-info text-xs'>Advertise</button></td>
      </tr>
    </tbody>  
  </table>
</div>
        </div>
    );

};

export default MyProducts;