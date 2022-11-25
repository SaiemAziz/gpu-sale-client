import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";


const DashHeader = ({role}) => {
  let { logOut, user, setUser, setRedirect } = useContext(AuthContext);
  let location = useLocation();
  let navigate = useNavigate();
  

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
          <label htmlFor="sidebar" className=" lg:hidden m-2">
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
        
        <NavLink to="/" className="btn btn-ghost normal-case text-xl font-extrabold hover:bg-base-300">
          <p className="px-3 py-2 text-base-300 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">GPU</p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 ml-1">SALE</p>
        </NavLink>
      </div>
      
      <div className="navbar-end">
        {user ? (
          <div className="flex gap-3">
            <p className="my-auto italic font-bold text-purple-600">{role?.toUpperCase()}</p>
            <div
              className="h-[30px] w-[30px] my-auto tooltip tooltip-bottom tooltip-info"
              data-tip={user?.displayName || "No Name"}
            >
              <img
                className="h-full w-full rounded-full"
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
