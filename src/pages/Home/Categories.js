import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../shared/components/Loading";

const Categories = () => {
  const {
    data: categories = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_URL}/category`, {
        headers: {
          authtoken: localStorage.getItem("auth-token"),
        },
      });
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
    <div className=" my-5 py-5 px-5">
      <h1 className="text-left text-4xl font-semibold my-5">Categories : {categories.length} Types</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {
            categories.map(c => 
            <div key={c._id} className='card glass rounded-2xl p-5 flex flex-col justify-between shadow-xl'>
                <div>
                    <img className="rounded-2xl" src={c.image} alt="" />
                    <p className="text-2xl my-3 font-semibold">{c.category.replaceAll('-', ' ').toUpperCase()}</p>
                    <p className="italic text-justify">{c.description}</p>
                </div>
                <Link to={`/category/${c.category}`} className="btn btn-secondary mt-5">All Products</Link>
            </div>    
            )
        }
      </div>
    </div>
  );
};

export default Categories;
