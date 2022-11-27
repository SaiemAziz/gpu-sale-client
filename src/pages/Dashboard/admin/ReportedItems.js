import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/Auth";
import useRoleCheck from "../../../hooks/useRoleCheck";
import { Loading } from "../../../shared/components/Loading";
const ReportedItems = () => {
  let { user } = useContext(AuthContext);
  let { role, loading } = useRoleCheck(user?.email);

  // react query
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL}/reported-items?email=${user?.email}`,
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

  if (role !== "admin") return <Navigate to="/dashboard/default" />;
  return (
    <div className="px-5">
      <p className="text-4xl text-center my-10">Reported Products</p>
      <div className="overflow-x-scroll w-[400px] sm:w-[500px] md:w-[750px]">
        <table className="table table-compact w-full ">
          <thead>
            <tr>
              <th>SN.</th>
              <th>Picture</th>
              <th>Option</th>
              <th>Name</th>
              <th>Seller</th>
              <th>Resale Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={i}>
                <th className="">{i + 1}</th>
                <td>
                  <img
                    className="h-[50px] rounded-2xl"
                    src={product?.photoURL}
                    alt=""
                  />
                </td>
                <td className="">
                  <button
                    className="btn btn-xs my-auto btn-error text-xs"
                    onClick={() => removeClicked(product?._id)}
                  >
                    Remove
                  </button>
                </td>
                <td>{product?.name}</td>
                <td>{product?.sellerName}</td>
                <td>{product?.resalePrice}$</td>
                <td>{product?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedItems;
