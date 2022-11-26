import React, { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import useRoleCheck from "../../hooks/useRoleCheck";
import { useTitle } from "../../hooks/useTitle";
import { Loading } from "../../shared/components/Loading";
import Header from '../../shared/Header'
import DashHeader from "./DashHeader";
const Dashboard = () => {
  let { user } = useContext(AuthContext);

  let { role, loading } = useRoleCheck(user?.email);
  useTitle(role.toUpperCase()+'-DASHBOARD')

  let menu = <>
  {
    role === 'buyer' &&
    <>
        <Link className="my-3 btn btn-accent" to='/dashboard/my-orders'>My Orders</Link>
        <Link className="my-3 btn btn-accent" to='/dashboard/my-wishlist'>My Wishlist</Link>
    </>
  }
  {
    role === 'seller' &&
    <>
        <Link className="my-3 btn btn-accent" to='/dashboard/add-a-product'>Add A Product</Link>
        <Link className="my-3 btn btn-accent" to='/dashboard/my-products'>My Products</Link>
        <Link className="my-3 btn btn-accent" to='/dashboard/my-buyers'>My Buyers</Link>
    </>
  }
  {
    role === 'admin' &&
    <>
        <Link className="my-3 btn btn-accent" to='/dashboard/all-sellers'>All Seller</Link>
        <Link className="my-3 btn btn-accent" to='/dashboard/all-buyers'>All Buyers</Link>
        <Link className="my-3 btn btn-accent" to='/dashboard/reported-items'>Reported Item</Link>
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
    <div className="max-w-7xl mx-auto">
      <DashHeader role={role}/>
      <div className="h-screen drawer drawer-mobile w-full">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        
        {/* <!-- Page content here --> */}
        <Outlet/>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-300 text-xl text-base-content">
          <p className="my-10 text-2xl italic font-semibold text-center">Dashboard</p>
          {/* <!-- Sidebar content here --> */}
          
          {menu}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
