import React, { useEffect } from "react";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import { useSelector, useDispatch } from "react-redux";
import { calculateSubtotal, calculateTotalQuantity } from "../../redux/slice/cartSlice";

const Checkout = () => {
  // Redux states
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateSubtotal());
    dispatch(calculateTotalQuantity());
  }, [dispatch, cartItems]);

  return (
    <main>
      <CheckoutForm />
    </main>
  );
};

export default Checkout;
