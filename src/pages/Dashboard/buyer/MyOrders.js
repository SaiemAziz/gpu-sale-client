import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/Auth";
import useRoleCheck from "../../../hooks/useRoleCheck";
import { Loading } from "../../../shared/components/Loading";

const MyOrders = () => {
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
        `${process.env.REACT_APP_URL}/my-booked-items?email=${user?.email}`,
        {
          headers: {
            authtoken: localStorage.getItem("auth-token"),
          },
        }
      );
      const data = await res.json();
      return data.products;
    },
  });

  if (loading || isLoading) return <Loading size={80} />;
  if (role !== "buyer") return <Navigate to="/dashboard/default" />;

  // remove handler
  let removeClicked = (id) => {
    let surity = window.confirm("Do you really want to delete the product?");
    if (!surity) return;

    fetch(
      `${process.env.REACT_APP_URL}/my-booked-items?id=${id}&email=${user?.email}`,
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
      <p className="text-4xl text-center my-10">My Orders List</p>
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
                <th>Resale Price</th>
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
                  {
                    product?.status !== 'sold' ?
                  <td className="flex flex-col gap-3">
                    <button
                      className="btn btn-xs btn-error text-xs my-auto"
                      onClick={() => removeClicked(product?._id)}
                    >
                      Remove
                    </button>
                    <Link
                      to="/payment"
                      className="btn btn-xs btn-success text-xs my-auto"
                    >
                      Payment
                    </Link>
                  </td> : 
                  <td>
                    <p className="text-xl font-bold text-success">Paid</p>
                  </td>
                  }
                  <td>{product?.name}</td>
                  <td>{product?.category.replaceAll('-',' ').toUpperCase()}</td>
                  <td className="text-primary text-base font-bold">{product?.status}</td>
                  <td>{product?.resalePrice}$</td>
                  <td>{product?.postDate}</td>
                  <td>{product?.used} yrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-2xl">You didnt book any product currently.</p>
      )}
    </div>
  );
};

export default MyOrders;
