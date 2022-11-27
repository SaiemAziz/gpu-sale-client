import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import CardCheckOutForm from "./CardCheckOutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_PK)

const CardPayment = ({p}) => {
  return (
    <div className="max-w-lg mx-auto my-5 bg-base-300 p-5 rounded-2xl">
        <h1 className="font-bold text-xl italic text-info">Card Information</h1>
      <Elements stripe={stripePromise}>
        <CardCheckOutForm price={p?.product?.resalePrice} p={p}/>
      </Elements>
    </div>
  );
};

export default CardPayment;
