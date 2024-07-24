import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  AdminRoute,
  Modal,
  Navbar,
  ProductDetails,
  ProtectedRoute,
} from "./components";
import { initializeAuth } from "./redux/slice/authSlice"; // Adjust the import path as needed
import {
  Admin,
  AllProducts,
  Cart,
  Checkout,
  CheckoutDetails,
  CheckoutSuccess,
  Contact,
  Home,
  NotFound,
  OrderDetails,
  OrderHistory,
  ResetPassword,
  Review,
} from "./pages";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const pageTransition = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={4000} closeOnClick />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div {...pageTransition}>
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <motion.div {...pageTransition}>
                  <OrderHistory />
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-details/:id"
            element={
              <motion.div {...pageTransition}>
                <OrderDetails />
              </motion.div>
            }
          />
          <Route
            path="/review-product/:id"
            element={
              <ProtectedRoute>
                <motion.div {...pageTransition}>
                  <Review />
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset"
            element={
              <motion.div {...pageTransition}>
                <ResetPassword />
              </motion.div>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div {...pageTransition}>
                <Contact />
              </motion.div>
            }
          />
          <Route
            path="/all"
            element={
              <motion.div {...pageTransition}>
                <AllProducts />
              </motion.div>
            }
          />
          <Route
            path="/product-details/:id"
            element={
              <motion.div {...pageTransition}>
                <ProductDetails />
              </motion.div>
            }
          />
          <Route
            path="/cart"
            element={
              <motion.div {...pageTransition}>
                <Cart />
              </motion.div>
            }
          />
          <Route
            path="/checkout-details"
            element={
              <motion.div {...pageTransition}>
                <CheckoutDetails />
              </motion.div>
            }
          />
          <Route
            path="/checkout"
            element={
              <motion.div {...pageTransition}>
                <Checkout />
              </motion.div>
            }
          />
          <Route
            path="/checkout-success"
            element={
              <motion.div {...pageTransition}>
                <CheckoutSuccess />
              </motion.div>
            }
          />
          {/* ADMIN ROUTES */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <motion.div {...pageTransition}>
                  <Admin />
                </motion.div>
              </AdminRoute>
            }
          />
          {/* 404 routes */}
          <Route
            path="/*"
            element={
              <motion.div {...pageTransition}>
                <NotFound />
              </motion.div>
            }
          />
        </Routes>
        <motion.div {...pageTransition}>
          <Modal />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default App;
