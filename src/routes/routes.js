import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Auth from "../context/Auth";
import Private from "../context/Private";
import Blogs from "../pages/Blogs/Blogs";
import Category from "../pages/Category/Category";
import AllBuyers from "../pages/Dashboard/admin/AllBuyers";
import AllSellers from "../pages/Dashboard/admin/AllSellers";
import ReportedItems from "../pages/Dashboard/admin/ReportedItems";
import MyOrders from "../pages/Dashboard/buyer/MyOrders";
import MyWishlist from "../pages/Dashboard/buyer/MyWishlist";
import Payment from "../pages/Dashboard/buyer/Payment/Payment";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddAProduct from "../pages/Dashboard/seller/AddAProduct";
import MyBuyers from "../pages/Dashboard/seller/MyBuyers";
import MyProducts from "../pages/Dashboard/seller/MyProducts";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ErrorPage2 from "../pages/ErrorPage/ErrorPage2";
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
                path: '/category/:title',
                element: <Private><Category/></Private>
            },
            {
                path: '/blogs',
                element: <Blogs/>
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
        errorElement: <ErrorPage2/>
    },
    {
        path: '/dashboard',
        element: <Auth><Private><Dashboard/></Private></Auth>,
        errorElement: <ErrorPage2/>,
        children: [
            {
                index: true,
                element: <div className="flex justify-center items-center text-4xl text-center mt-40 mx-5"><p>Please Choose an option from Side Bar</p></div>
            },
            {
                path: '/dashboard/default',
                element: <div className="flex justify-center items-center text-4xl text-center mt-40 mx-5"><p>Please Choose an option from Side Bar</p></div>
            },
            {
                path: '/dashboard/all-sellers',
                element: <Auth><Private><AllSellers/></Private></Auth>
            },
            {
                path: '/dashboard/all-buyers',
                element: <Auth><Private><AllBuyers/></Private></Auth>
            },
            {
                path: '/dashboard/reported-items',
                element: <Auth><Private><ReportedItems/></Private></Auth>
            },
            {
                path: '/dashboard/my-wishlist',
                element: <Auth><Private><MyWishlist/></Private></Auth>
            },
            {
                path: '/dashboard/my-orders',
                element: <Auth><Private><MyOrders/></Private></Auth>
            },
            {
                path: '/dashboard/add-a-product',
                element: <Auth><Private><AddAProduct/></Private></Auth>
            },
            {
                path: '/dashboard/my-buyers',
                element: <Auth><Private><MyBuyers/></Private></Auth>
            },
            {
                path: '/dashboard/my-products',
                element: <Auth><Private><MyProducts/></Private></Auth>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Auth><Private><Payment/></Private></Auth>
            },
        ]
    }
])