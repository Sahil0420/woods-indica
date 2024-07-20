import React, { useEffect } from "react";
import useFetchCollection from "../../hooks/useFetchCollection";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { storeOrders } from "../../redux/slice/orderSlice";
import OrdersComponent from "../ordersComponent/OrdersComponent";

const Orders = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const { orderHistory } = useSelector((store) => store.order);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetched orders:", data);
    if (data.length > 0) {
      dispatch(storeOrders(data));
    }
  }, [dispatch, data]);

  useEffect(() => {
    console.log("Order history from Redux:", orderHistory);
  }, [orderHistory]);

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl md:text-3xl text-center font-bold mb-4">ALL ORDERS</h1>
      <OrdersComponent orders={orderHistory} user={false} admin={true} />
    </div>
  );
};

export default Orders;