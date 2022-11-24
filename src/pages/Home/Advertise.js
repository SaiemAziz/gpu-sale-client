import { useQuery } from '@tanstack/react-query';
import React from 'react';

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
    return (
        <div className='border-t-4 border-black my-5 py-5 '>
            <h1 className='text-left text-4xl font-semibold my-5'>Advertisement {products.length}</h1>
        </div>
    );
};

export default Advertise;