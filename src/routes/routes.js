import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Auth from "../context/Auth";
import Private from "../context/Private";
import Dashboard from "../pages/Dashboard/Dashboard";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login&Register/Login";
import Register from "../pages/Login&Register/Register";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Auth><App/></Auth>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
        ],
        errorElement: <ErrorPage/>
    },
    {
        path: '/dashboard',
        element: <Auth><Private><Dashboard/></Private></Auth>,
        errorElement: <ErrorPage/>
    }
])