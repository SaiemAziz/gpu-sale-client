import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/Auth";
import useRoleCheck from "../../hooks/useRoleCheck";
import { Loading } from "../../shared/components/Loading";

const BookNowModal = ({p, setP, refetch}) => {

  let [modalLoading, setModalLoading] = useState(false)

  let {user} = useContext(AuthContext)

  let {role, loading} = useRoleCheck(user?.email)

  let checkedForm = e => {
    e.preventDefault()
    setModalLoading(true)
    let bookedProduct = {
      product_ID : p._id,
      buyerEmail : user?.email,
      buyerName : user?.displayName,
      productName : p.name,
      category : p.category,
      buyerMobileNo : e.target.mobileNo.value,
      address : e.target.address.value,
      paid : false,
      sellerEmail : p.sellerEmail
    }

    fetch(`${process.env.REACT_APP_URL}/book-a-item?email=${user?.email}`,{

      method : 'POST',
      headers : {
        "content-type": "application/json",
        authtoken : localStorage.getItem('auth-token'),
      },
      body : JSON.stringify(bookedProduct)
    }).then(res => res.json())
    .then(data=>{
      if(data.result.acknowledged){
        setModalLoading(false)
        toast.success('Successfully Booked')
        refetch()
        setInterval(()=>{
          setP(null)
        }, 1000)
      }
    })
  }
  
  

  return (
    <div>
      <input type="checkbox" id="bookNow" className="modal-toggle" />
      <div className="modal backdrop-blur-xl">
        <div className="modal-box relative ">
          <label
            htmlFor="bookNow"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          {
            user ? 
            role==='buyer' ? 
            <>
            <h1 className="text-2xl font-bold mb-3">Provide Information</h1>
            <form onSubmit={checkedForm} className="grid sm:grid-cols-2 grid-cols-1 gap-5 p-5 text-left">
          <h1 className="my-auto text-xl">Product Name</h1>
            <input
              className="input input-info"
              required
              name="name"
              value={p.name}
              type="text"
              disabled
            />
          <h1 className="my-auto text-xl">Category</h1>
            <input
              className="input input-info"
              required
              name="category"
              value={p.category?.replaceAll('-',' ').toUpperCase()}
              type="text"
              disabled
            />
          <h1 className="my-auto text-xl">Your Name</h1>
            <input
              className="input input-info"
              required
              name="buyerName"
              value={user?.displayName}
              type="text"
              disabled
            />
          <h1 className="my-auto text-xl">Your Email</h1>
            <input
              className="input input-info"
              required
              name="email"
              value={user?.email}
              type="text"
              disabled
            />
          <h1 className="my-auto text-xl">Phone no.</h1>
            <input
              className="input input-info"
              required
              name="mobileNo"
              type="number"
            />
          <h1 className="my-auto text-xl">Meeting Address</h1>
            <input
              className="input input-info"
              required
              name="address"
              type="text"
            />
            {
              modalLoading ? 
              <div className="mx-auto w-fit sm:col-span-2">
                <Loading size={30}/>
              </div>
              : <input className="sm:col-span-2 btn btn-info" type='submit' value='Checkout'/>
            }
          </form> 
            </> : <p className="text-xl">Only Buyers can book a product.</p>
          :
          <p className="text-xl">Please <Link to='/login' className="btn btn-xs btn-info btn-outline">LogIn</Link> first to book.</p>
          }
        </div>
      </div>
    </div>
  );
};

export default BookNowModal;
