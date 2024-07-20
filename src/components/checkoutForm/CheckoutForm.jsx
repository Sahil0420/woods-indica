import React, { useState, useEffect } from "react";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import Header from "../header/Header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// firebase
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
// redux
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/slice/cartSlice";
import Loader from "../loader/Loader";
import Razorpay from "razorpay";

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, userId } = useSelector((store) => store.auth);
  const { cartItems, totalAmount } = useSelector((store) => store.cart);
  const { shippingAddress } = useSelector((store) => store.checkout);

  const saveOrder = async () => {
    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();
    const orderDetails = {
      userId,
      email,
      orderDate: date,
      orderTime: time,
      orderAmount: totalAmount,
      orderStatus: "Order Placed",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      await addDoc(collection(db, "orders"), orderDetails);
      dispatch(clearCart());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);

    const options = {
      key: "rzp_test_ABsA8G5FoiHFA6", // Replace with your Razorpay Key ID
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "Your Company Name",
      description: "Purchase Description",
      handler: function (response) {
        setIsLoading(false);
        toast.success("Payment Successful");
        saveOrder();
        navigate("/checkout-success", { replace: true });
      },
      prefill: {
        email: email,
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          setIsLoading(false);
          toast.error("Payment cancelled or failed");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      // console.log("Razorpay script loaded");
    };
    script.onerror = () => {
      toast.error("Failed to load Razorpay script");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Header text="Razorpay Payment Gateway" />
      <section className="w-full mx-auto p-4 md:p-10 md:w-9/12 md:px-6 flex flex-col h-full">
        <div className="flex flex-col-reverse md:flex-row gap-4 justify-evenly">
          <div className="w-full md:w-2/5 h-max p-4 bg-base-100 rounded-md shadow-xl">
            <CheckoutSummary />
          </div>
          <div className="rounded-md shadow-xl pt-4 pb-8 px-10">
            <h1 className="text-3xl font-bold mb-2">Razorpay Checkout</h1>
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className={`btn ${isLoading ? "bg-gray-400" : "bg-blue-600"}`}
            >
              {isLoading ? <Loader /> : "Pay now"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutForm;
