import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';

const SingleProduct = ({p, refetch}) => {

    let {user} = useContext(AuthContext)

    let reported = id => {
        fetch(`${process.env.REACT_APP_URL}/report-a-item?email=${user.email}&id=${id}`,{
            method: 'PUT',
            headers: {
                authtoken : localStorage.getItem('auth-token')
            }
        }).then(res => res.json())
        .then(data => console.log(data.result))
    }

    return (
        <div className='card glass flex flex-col justify-between p-5 '>
                    <div>
                    <img className="rounded-2xl" src={p.photoURL} alt="" />
                    <p className="text-2xl my-3 font-semibold"> {p.name}</p>
                    <p className="text-left my-3 font-semibold">Seller: {p.email}</p>
                    <p className="italic text-justify">{p.description}</p>
                </div>
                <div className='mt-5 flex justify-between'>
                <Link to={`/payment/${p._id}`} className="btn btn-secondary">Book Now</Link>
                <button className='btn btn-error'
                        onClick={()=>reported(p._id)}
                    >Report</button>
                </div>
                </div>    
    );
};

export default SingleProduct;