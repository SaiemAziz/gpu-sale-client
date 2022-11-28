import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/Auth";
import useBlueTick from "../../hooks/useBlueTick";
import { Loading } from "../../shared/components/Loading";
import { GoVerified } from "react-icons/go";

const SingleProduct = ({ p, refetch, setBookProduct }) => {
  let { user } = useContext(AuthContext);
  let { blueTick, verifyLoading } = useBlueTick(p.sellerEmail);

  // fetching product by ID
  let reported = (id) => {
    fetch(
      `${process.env.REACT_APP_URL}/report-a-item?email=${user.email}&id=${id}`,
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
          toast.success("Successfully reported the product to Admin");
        } else {
          toast.error("Only Buyer can report a product");
        }
        refetch();
      });
  };

  if (verifyLoading)
    return (
      <div className="flex justify-center items-center my-20">
        <Loading size={50}></Loading>
      </div>
    );

  return (
    <div className="card glass flex flex-col justify-between p-5 shadow-xl">
        <div className="">
            <img className="rounded-2xl" src={p.photoURL} alt="" />
            <p className="font-bold w-fit rounded-full px-4 ml-auto text-primary-content bg-success text-end mt-3 ">
            Condition: {p.condition}
          </p>
        </div>
        <div className="">
          <p className="text-2xl text-info-content my-3 font-semibold"> {p.name}</p>
          
          <div className="my-4">
            <p className="text-left font-semibold flex gap-2">
              Seller: {p.sellerName}{" "}
              {blueTick && <GoVerified className="text-blue-600 my-auto" />}
            </p>
            <p className="font-semibold text-justify">Contact: {p.mobileNo}</p>
          </div>
          <div className="flex justify-between">
            <p className=" font-bold text-justify">
              Resale Price: 
              <span className="text-purple-500"> {p.resalePrice}$</span>
            </p>
            <p className="font-bold text-justify">
              Used: 
              <span className="text-purple-500"> {p.used} yrs</span>
            </p>
          </div>
          
          <p className="font-semibold mt-5 text-justify">Description:</p>
          <p className="italic text-justify text-neutral">{p.description}</p>
          <div className="mt-5 flex justify-between">
            <label
              htmlFor="bookNow"
              onClick={() => setBookProduct(p)}
              className="btn btn-info hover:scale-110"
            >
              Book Now
            </label>
            {user && (
              <button className="btn btn-error btn-outline hover:scale-110" onClick={() => reported(p._id)}>
                Report
              </button>
            )}
          </div>
        </div>
    </div>
  );
};

export default SingleProduct;
