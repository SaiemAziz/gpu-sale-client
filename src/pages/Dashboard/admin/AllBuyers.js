import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/Auth";
import { useQuery } from "@tanstack/react-query";
import useRoleCheck from "../../../hooks/useRoleCheck";
import { Loading } from "../../../shared/components/Loading";

const AllBuyers = () => {
  let { user } = useContext(AuthContext);
  let { role, loading } = useRoleCheck(user?.email);

  const {
    data: buyers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL}/all-buyers?email=${user?.email}`,
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

  let updateBuyer = (id) => {
    let surity = window.confirm("Want to delete this buyer?");
    if (!surity) return;

    fetch(
      `${process.env.REACT_APP_URL}/all-buyers?email=${user?.email}&id=${id}`,
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
          toast.success("Buyer Successfully Deleted");
          refetch();
        }
      });
  };

  return (
    <div className="px-5">
      <p className="text-4xl text-center my-10">
        All Buyers List: {buyers.length || 0}
      </p>
      {buyers.length ? (
        <div className="overflow-x-scroll w-[400px] sm:w-[500px] md:w-[750px]">
          <table className="table table-compact w-full ">
            <thead>
              <tr>
                <th>SN.</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Email</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer, i) => (
                <tr key={i} className='hover'>
                  <th className="">{i + 1}</th>
                  <td>
                    <img
                      className="h-[50px] rounded-2xl"
                      src={buyer?.photoURL}
                      alt=""
                    />
                  </td>
                  <td>{buyer?.displayName || "No Name"}</td>
                  <td>{buyer?.email || "No Email"}</td>
                  <td>
                    <button
                      className="btn btn-xs btn-error text-xs"
                      onClick={() => updateBuyer(buyer?._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-2xl">There is no buyer currently.</p>
      )}
    </div>
  );
};

export default AllBuyers;
