import { async } from "@firebase/util";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/Auth";
import useRoleCheck from "../../../hooks/useRoleCheck";
import { Loading } from "../../../shared/components/Loading";

const AddAProduct = () => {
  let { user } = useContext(AuthContext);
  let [addloading, setAddLoading] = useState(false)
  let { role, loading } = useRoleCheck(user?.email);
  let url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB}`
  if (loading) return <Loading size={80} />;

  if (role !== "seller") return <Navigate to="/dashboard/default" />;

  // add a product form
  let addForm = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    let realDate = e.target.date.value;
    let past_date = new Date(realDate);
    realDate = (past_date.toLocaleDateString());
    let current_date = new Date();
    let postDate = (current_date.toLocaleDateString());
    if(past_date>current_date) {
        toast.error('Please select the real buying date')
        setAddLoading(false)
        return e.target.reset()
    }
    let difference_In_Time = current_date.getTime() - past_date.getTime();
    let difference_In_years = difference_In_Time / (1000 * 3600 * 24 * 365);
    let used = parseFloat(difference_In_years.toFixed(2))

    // image 
    let image = e.target.image.files[0]
        let formData = new FormData()
        formData.append("image", image)
        let res = await fetch(url, {
            method: "POST",
            body: formData
        })
        let data = await res.json()

    let product = {
        name : e.target.name.value,
        email : user?.email,
        description : e.target.description.value,
        originalPrice : e.target.originalPrice.value,
        resalePrice : e.target.resalePrice.value,
        mobileNo : e.target.mobileNo.value,
        used : used,
        postDate : postDate,
        realDate : realDate,
        advertise : false,
        status : 'available',
        photoURL : data.data.url
    }

    fetch(`${process.env.REACT_APP_URL}/add-a-product`,{
        method: 'POST',
        headers: {
            "content-type": "application/json",
            authtoken : localStorage.getItem('auth-token')
        },
        body: JSON.stringify(product)
    })
    .then(res => res.json())
    .then(data => {
        if(data.result.acknowledged){
            toast.success('Successfully Added A New Product')
            setAddLoading(false)
            e.target.reset();
        }
    })
  };

  return (
    <div className="">
      <h1 className="text-4xl text-center my-10">Please Add A Product</h1>
      <form onSubmit={addForm} className="grid sm:grid-cols-2 grid-cols-1 gap-2 p-5">
        <h1 className="my-auto text-xl">Product Name</h1>
        <input
          className="input input-info"
          required
          name="name"
          placeholder="Product Name"
          type="text"
        />
        <h1 className='my-auto text-xl'>Image</h1>
        <input type="file" className="file-input file-input-bordered file-input-info" name='image' required/>
        <h1 className="my-auto text-xl">Buying Date</h1>
        <input
          className="input input-info"
          required
          name="date"
          placeholder="Product Name"
          type="date"
        />
        <h1 className="my-auto text-xl">Description</h1>
        <input
          className="input input-info"
          required
          name="description"
          placeholder="Product Description"
          type="text"
        />    
        <h1 className="my-auto text-xl">Original Price</h1>
        <input
          className="input input-info"
          required
          name="originalPrice"
          placeholder="Original Price $"
          type="number"
        />    
        <h1 className="my-auto text-xl">Resale Price</h1>
        <input
          className="input input-info"
          required
          name="resalePrice"
          placeholder="Resale Price $"
          type="number"
        />    
        <h1 className="my-auto text-xl">Mobile No.</h1>
        <input
          className="input input-info"
          required
          name="mobileNo"
          placeholder="Your Phone Number"
          type="number"
        />    
        <h1 className="my-auto text-xl">Address</h1>
        <input
          className="input input-info"
          required
          name="address"
          placeholder="Your Full Address"
          type="text"
        />    
        {
            addloading ?
            <div className="sm:col-span-2 mt-5 mx-auto w-fit">
                <Loading size={30} className=''/>
            </div> : 
            <input className="btn btn-success sm:col-span-2 mt-5" type="submit" value="Add Product" />
        }
      </form>
    </div>
  );
};

export default AddAProduct;
