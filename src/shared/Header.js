import React, { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

const Header = () => {
  let { logOut, user, setUser, setRedirect } = useContext(AuthContext);
  let location = useLocation();
  let navigate = useNavigate();
  let menu = (
    <>
      <NavLink className={({isActive})=>isActive ? 'btn-ghost text-accent-content underline font-bold btn' : 'btn btn-ghost font-bold'} to="/home">
        Home
      </NavLink>
      <NavLink className={({isActive})=>isActive ? 'btn-ghost text-accent-content underline font-bold btn' : 'btn btn-ghost font-bold'} to="/blogs">
        Blogs
      </NavLink>
      {
        user && <NavLink className={({isActive})=>isActive ? 'btn-ghost text-accent-content underline font-bold btn' : 'btn btn-ghost font-bold'} to="/dashboard">
        Dashboard
      </NavLink>
      }
    </>
  );

  let logoutClicked = () => {
    setRedirect(location.pathname === ('/login' || 'register') ? '/' : location.pathname );
    logOut()
      .then(() => setUser(null))
      .catch(() => setUser(null));
    navigate("/login");
    localStorage.removeItem("auth-token");
  };

  return (
    <div className="navbar bg-base-300 shadow-xl sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown shadow-xl">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
          >
            {menu}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost normal-case text-xl font-extrabold hover:bg-base-300">
          <p className="px-3 py-2 text-base-300 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">GPU</p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 ml-1">SALE</p>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menu}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex gap-5">
            <div
              className="h-[40px] my-auto tooltip tooltip-bottom tooltip-info"
              data-tip={user?.displayName || "No Name"}
            >
              <img
                className="h-full rounded-full"
                src={user?.photoURL || process.env.REACT_APP_BLANK}
                alt=""
              />
            </div>
            <button onClick={logoutClicked} className="btn btn-error">
              Log Out
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-success">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
