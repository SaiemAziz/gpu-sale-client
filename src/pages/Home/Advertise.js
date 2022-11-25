import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Loading } from '../../shared/components/Loading';

const Advertise = () => {
    const {
        data: products = [],
        refetch,
        isLoading,
      } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
          const res = await fetch(`${process.env.REACT_APP_URL}/advertise-products`, {
            headers: {
                authtoken: localStorage.getItem('auth-token')
            }
          });
          const data = await res.json();
          return (data.result);
        },
      });

    if(isLoading)
    return <div className='flex justify-center items-center my-20'>
        <Loading size={50}></Loading>
    </div>

    if(products?.length > 0)
    return (
        <div className='border-t-4 border-black my-5 py-5 px-5'>
            <h1 className='text-left text-4xl font-semibold my-5'>Advertisement {products.length}</h1>
        </div>
    );
};

export default Advertise;