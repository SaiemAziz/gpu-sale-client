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
      const res = await fetch(
        `${process.env.REACT_APP_URL}/my-products?email=${user?.email}`,
        {
          headers: {
            authtoken: localStorage.getItem("auth-token"),
          },
        }
      );
      const data = await res.json();
      return data.result;
    },
  });

  if (loading || isLoading) return <Loading size={80} />;
  if (role !== "seller") return <Navigate to="/dashboard/default" />;

  // advertise handler
  let ad = (id) => {
    fetch(
      `${process.env.REACT_APP_URL}/my-products?id=${id}&email=${user?.email}`,
      {
        method: "PUT",
        headers: {
          authtoken: localStorage.getItem("auth-token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result.acknowledged) {
          toast.success("Successfully Advertising at Home page");
          refetch();
        }
      });
  };

  // remove handler
  let removeClicked = (id) => {
    let surity = window.confirm("Do you really want to delete the product?");
    if (!surity) return;

    fetch(
      `${process.env.REACT_APP_URL}/my-products?id=${id}&email=${user?.email}`,
      {
        method: "DELETE",
        headers: {
          authtoken: localStorage.getItem("auth-token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result.acknowledged) {
          toast.success("Successfully Removed");
          refetch();
        }
      });
  };

  return (
    <div className="px-5">
      <p className="text-4xl text-center my-10">My Products List</p>
      {products.length ? (
        <div className="overflow-x-scroll w-[400px] sm:w-[500px] md:w-[750px]">
          <table className="table table-compact w-full ">
            <thead>
              <tr>
                <th>SN.</th>
                <th>Picture</th>
                <th>Option</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Price</th>
                <th>Post Date</th>
                <th>Years Used</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={i} className='hover'>
                  <th className="">{i + 1}</th>
                  <td>
                    <img
                      className="h-[50px] rounded-2xl"
                      src={product?.photoURL}
                      alt=""
                    />
                  </td>
                  {product?.status !== "sold" && (
                    <td className="flex flex-col">
                      <button
                        className="btn btn-xs mb-3 btn-error text-xs"
                        onClick={() => removeClicked(product?._id)}
                      >
                        Remove
                      </button>
                      {!product?.advertise ? (
                        <button
                          className="btn btn-xs btn-info text-xs"
                          onClick={() => ad(product?._id)}
                        >
                          Advertise
                        </button>
                      ) : (
                        <p className="text-success font-bold text-center">Advertised</p>
                      )}
                    </td>
                  )}
                  <td>{product?.name}</td>
                  <td>
                    {product?.category.replaceAll("-", " ").toUpperCase()}
                  </td>
                  <td className="text-primary text-base font-bold">
                    {product?.status === "booked"
                      ? "available"
                      : product?.status}
                  </td>
                  <td>{product?.resalePrice}$</td>
                  <td>{product?.postDate}</td>
                  <td>{product?.used} yrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-2xl">You didnt add any products.</p>
      )}
    </div>
  );
};

export default MyProducts;
