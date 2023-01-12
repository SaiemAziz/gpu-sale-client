import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Loading } from '../../shared/components/Loading';
import BookNowModal from '../Category/BookNowModal';
import SingleProduct from '../Category/SingleProduct';

const Collection = () => {
    let [bookProduct, setBookProduct] = useState([])
    const {
        data: products = [],
        refetch,
        isLoading,
      } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
          const res = await fetch(`${process.env.REACT_APP_URL}/all-products`, {
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
        <div className="bg-[url('https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGMlMjBidWlsZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')] flex-1 bg-cover bg-fixed">
        <div className='max-w-7xl mx-auto backdrop-blur-xl pt-20 bg-base-100 bg-opacity-50'>
            <h1 className='border-b-4 text-accent-content pb-5 border-accent-content w-fit mx-auto text-4xl font-bold'>ALL Products {products.length}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-10">
          {products.map((p) => (
           <SingleProduct key={p._id} p={p} refetch={refetch} 
            setBookProduct = {setBookProduct}
            />
          ))}
        </div>
        </div>
        {bookProduct && <BookNowModal p={bookProduct} setP={setBookProduct} refetch={refetch}/>}
        </div>
    );
};

export default Collection;

