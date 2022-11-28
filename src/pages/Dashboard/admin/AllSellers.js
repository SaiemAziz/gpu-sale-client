import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../context/Auth";
import { useQuery } from "@tanstack/react-query";
import useRoleCheck from "../../../hooks/useRoleCheck";
import { Loading } from "../../../shared/components/Loading";
import { toast } from "react-toastify";
import { GoVerified } from "react-icons/go";
const AllSellers = () => {
  let { user } = useContext(AuthContext);
  let { role, loading } = useRoleCheck(user?.email);
  // fetch sellers
  const {
    data: sellers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL}/all-sellers?email=${user?.email}`,
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

  if (loading) return <Loading size={80} />;

  if (role !== "admin") return <Navigate to="/dashboard/default" />;

  // update sellers
  let updateSeller = (id, task) => {
    fetch(
      `${process.env.REACT_APP_URL}/all-sellers?email=${user?.email}&id=${id}&task=${task}`,
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
          toast.success("Seller Successfully Verified");
          refetch();
        }
      });
  };

  return (
    <div className="px-5">
      <p className="text-4xl text-center my-10">
        All Sellers List: {sellers.length || 0}
      </p>
      {sellers.length ? (
        <div className="overflow-x-scroll w-[400px] sm:w-[500px] md:w-[750px]">
          <table className="table table-compact w-full ">
            <thead>
              <tr>
                <th>SN.</th>
                <th>Picture</th>
                <th>Option</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, i) => (
                <tr key={i} className='hover'>
                  <th className="">{i + 1}</th>
                  <td>
                    <img
                      className="h-[50px] rounded-2xl"
                      src={seller?.photoURL}
                      alt=""
                    />
                  </td>
                  <td className="flex flex-col gap-2">
                    {!seller.verified ? (
                      <button
                        className="btn btn-xs btn-info text-xs"
                        onClick={() => updateSeller(seller?._id, "verify")}
                      >
                        Verify
                      </button>
                    ) : (
                      <p className="text-center font-bold text-success">
                        Verified
                      </p>
                    )}

                    <button
                      className="btn btn-xs btn-error text-xs"
                      onClick={() => updateSeller(seller?._id, "ban")}
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    <p className="flex items-center gap-3">
                      {seller?.displayName || "No Name"}{" "}
                      {seller?.verified && (
                        <GoVerified className="text-blue-600 my-auto" />
                      )}
                    </p>
                  </td>
                  <td>{seller?.email || "No Email"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-2xl">There is no seller currently.</p>
      )}
    </div>
  );
};

export default AllSellers;
