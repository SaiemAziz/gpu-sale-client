import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/Auth";
import useRoleCheck from "../../hooks/useRoleCheck";
import { useTitle } from "../../hooks/useTitle";
import { Loading } from "../../shared/components/Loading";
import BookNowModal from "./BookNowModal";
import SingleProduct from "./SingleProduct";

const Category = () => {
  let location = useLocation();
  let [bookProduct, setBookProduct] = useState([])
  let title = location.pathname
    .replace("/category/", "")
    .replaceAll("-", " ")
    .toUpperCase();

  useTitle(title);
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL}${location.pathname}`,
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center my-20">
        <Loading size={50}></Loading>
      </div>
    );

  return (
    <div>
      <h1 className="text-4xl font-semibold my-10">Category : {title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {products.map((p) => (
          <SingleProduct key={p._id} p={p} refetch={refetch} 
          setBookProduct = {setBookProduct}
          />
        ))}
      </div>

      {bookProduct && <BookNowModal p={bookProduct} setP={setBookProduct} refetch={refetch}/>}

      {products.length === 0 && (
        <p>No product is available now in this category</p>
      )}
      
    </div>
  );
};

export default Category;
