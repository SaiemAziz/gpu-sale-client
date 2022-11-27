import React, { useContext, useEffect, useState } from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import { AuthContext } from '../../../../context/Auth';
import { Loading } from '../../../../shared/components/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const CardCheckOutForm = ({price, p}) => {
  let [cardError, setCardError] = useState({})
  let navigate = useNavigate()
  let [cardSecret, setCardSecret] = useState('')
  let [cardLoading, setCardLoading] = useState(false)
  let {user} = useContext(AuthContext)
  let {buyerEmail, buyerName, buyerMobileNo, product_ID, productName} = p?.booked
  const stripe = useStripe()
  const elements = useElements()
  useEffect(()=>{
    setCardLoading(true)
    fetch(`${process.env.REACT_APP_URL}/create-payment-intent?email=${user?.email}`,{
      method: 'POST',
      headers : {
        "content-type": "application/json",
        authtoken : localStorage.getItem('auth-token')
      },
      body : JSON.stringify({price})
    }).then(res => res.json())
    .then(data =>{
      setCardLoading(false)
      setCardSecret(data.client_secret)
    })
  },[])


  const handleSubmit = async e => {
    e.preventDefault()
    if(!stripe || !elements)
      return;

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const {error: createError, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (createError) {
      setCardError(createError)
    } else {
      setCardError({})

    const {paymentIntent, error} = await stripe.confirmCardPayment(
      cardSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email : buyerEmail,
            name : buyerName,
            phone : buyerMobileNo,
            // buyerName: buyerName,
            // buyerMobileNo: buyerMobileNo,
            // productName: productName
          },
          metadata : {
            product_ID: product_ID
          }
        },
      },
    );
    if(error){
      setCardError(error)
      return;
    }
    else{
      setCardError('')
      if(paymentIntent.status === 'succeeded'){
        toast.success('Payment Successful. Thank You')
        fetch(`${process.env.REACT_APP_URL}/payment-complete?email=${user?.email}`,{
          method: 'POST',
          headers: {
            "content-type": "application/json",
            authtoken : localStorage.getItem('auth-token')
          },
          body : JSON.stringify({paymentIntent, product_ID})
        }).then(res => res.json())
        .then(data => {
          console.log(data)
          if(data.result2.acknowledged)
          {
            navigate('/dashboard/my-orders')
          }
        })
      }
    }
  }
  }
  


    return (
        <form onSubmit={handleSubmit}>
      <CardElement
      className='outline p-3 text-white rounded-2xl my-5'
        options={{
          style: {
            base: {
              fontSize: '20px',
              color: '#000000',
              '::placeholder': {
                color: '#000000',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {cardError && 
        <div className='my-5 text-error font-bold'>
          <p>{cardError.message}</p>
        </div>
      }
      {
        cardLoading ? 
        <div className='flex justify-center'>
          <Loading size={50} />
        </div>
        : <button type="submit" className='btn btn-outline font-semibold px-20 btn-info' disabled={!stripe || !cardSecret}>
        Pay
      </button>
      }
    </form>
    );
};

export default CardCheckOutForm;