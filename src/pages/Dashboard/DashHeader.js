import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";


const DashHeader = ({role}) => {
  let { logOut, user, setUser, setRedirect } = useContext(AuthContext);
  let location = useLocation();
  let navigate = useNavigate();
  let menu = (
    <>
      <NavLink className="btn btn-ghost" to="/home">
        Home
      </NavLink>
      <NavLink className="btn btn-ghost" to="/blogs">
        Blogs
      </NavLink>
      <NavLink className="btn btn-ghost" to="/categories">
        Category
      </NavLink>
      <NavLink className="btn btn-ghost" to="/dashboard">
        Dashboard
      </NavLink>
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
    <div className="navbar bg-base-300 sticky top-0 z-50">
      <div className="navbar-start">
          <label htmlFor="sidebar" className="btn btn-ghost lg:hidden">
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
        
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          daisyUI
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menu}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex gap-3">
            <p className="my-auto text-2xl italic font-bold text-amber-600">{role.toUpperCase()}</p>
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

export default DashHeader;
