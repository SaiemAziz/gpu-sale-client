import { useQuery } from '@tanstack/react-query';
import React, {useState} from 'react';
import { Loading } from '../../shared/components/Loading';
import BookNowModal from '../Category/BookNowModal';
import SingleProduct from '../Category/SingleProduct';

const Advertise = () => {

  let [bookProduct, setBookProduct] = useState([])

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
        <div className='border-b-4 border-neutral mt-5 py-5 px-5'>
            <h1 className='text-left text-4xl font-semibold my-5'>Advertisement {products.length}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {products.map((p) => (
         p.advertise && <SingleProduct key={p._id} p={p} refetch={refetch} 
          setBookProduct = {setBookProduct}
          />
        ))}
      </div>
      {bookProduct && <BookNowModal p={bookProduct} setP={setBookProduct} refetch={refetch}/>}
        </div>
    );
};

export default Advertise;