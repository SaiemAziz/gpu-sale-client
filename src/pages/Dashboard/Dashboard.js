import React, { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import useRoleCheck from "../../hooks/useRoleCheck";
import { Loading } from "../../shared/components/Loading";

const Dashboard = () => {
  let { user } = useContext(AuthContext);

  let { role, loading } = useRoleCheck(user?.email);

  let menu = <>
  {
    role === 'buyer' &&
    <>
        <Link to='/my-orders'>My Orders</Link>
        <Link to='/my-wishlist'>My Wishlist</Link>
    </>
  }
  {
    role === 'seller' &&
    <>
        <Link to='/add-a-product'>Add A Product</Link>
        <Link to='/my-products'>My Products</Link>
        <Link to='/my-buyers'>My Buyers</Link>
    </>
  }
  {
    role === 'admin' &&
    <>
        <Link to='/all-seller'>All Seller</Link>
        <Link to='/all-buyers'>All Buyers</Link>
        <Link to='/reported-items'>Reported Item</Link>
    </>
  }
  </>

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading size={100}></Loading>
      </div>
    );

  return (
    <div class="h-screen drawer drawer-mobile w-full">
      <input id="sidebar" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center justify-center">
        {/* <!-- Page content here --> */}
        <Outlet/>
        <label
          for="sidebar"
          class="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div class="drawer-side">
        <label for="sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-80 bg-base-300 text-base-content">
          {/* <!-- Sidebar content here --> */}
          {menu}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
