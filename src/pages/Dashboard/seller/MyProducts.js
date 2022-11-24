import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/Auth";
import useRoleCheck from "../../../hooks/useRoleCheck";
import { Loading } from "../../../shared/components/Loading";

const MyProducts = () => {
  let { user } = useContext(AuthContext);
  let { role, loading } = useRoleCheck(user?.email);
  //   let [products, setProducts] = useState([]);

  // react query
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_URL}/my-products?email=${user?.email}`, {
        headers: {
            authtoken: localStorage.getItem('auth-token')
        }
      });
      const data = await res.json();
      return (data.result);
    
    },
  });


  if (loading || isLoading) return <Loading size={80} />;
  if (role !== "seller") return <Navigate to="/dashboard/default" />;


  // advertise handler
  let ad = (id) => {
    fetch(`${process.env.REACT_APP_URL}/my-products?id=${id}&email=${user?.email}`, {
        method: 'PUT',
        headers: {
            authtoken: localStorage.getItem('auth-token')
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.result.acknowledged)
        {
            toast.success('Successfully Advertising')
            refetch()
        }
      })
  }

  return (
    <div className="px-5">
        <p className="text-4xl text-center my-10">My Products List</p>
      <div className="overflow-x-scroll w-[400px] sm:w-[500px] md:w-[750px]">
        <table className="table table-compact w-full ">
          <thead>
            <tr>
              <th>SN.</th>
              <th>Picture</th>
              <th>Name</th>
              <th>Real Price</th>
              <th>Resale Price</th>
              <th>Post Date</th>
              <th>Buying Date</th>
              <th>Years Used</th>
              <th>Status</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={i}>
                <th className="">{i + 1}</th>
                <td><img className="h-[50px] rounded-2xl" src={product?.photoURL} alt="" /></td>
                <td>{product?.name}</td>
                <td>{product?.originalPrice}$</td>
                <td>{product?.resalePrice}$</td>
                <td>{product?.postDate}</td>
                <td>{product?.realDate}</td>
                <td>{product?.used} yrs</td>
                <td>{product?.status}</td>
                <td>
                    {
                        !product?.advertise ?
                        <button className="btn btn-xs btn-info text-xs" onClick={()=>ad(product?._id)}
                            >Advertise
                        </button> :
                        <p className="text-success font-bold">Advertised</p>
                    }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
