import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthSlice } from '../../redux/slice/authSlice'

const AdminRoute = ({ children }) => {
  const { isAdmin, isUserLoggedIn, loading } = useSelector(selectAuthSlice);

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center w-full page gap-5">
        <h2 className="text-4xl font-bold">Loading...</h2>
      </section>
    );
  }

  if (!isUserLoggedIn) {
    return (
      <section className="flex flex-col items-center justify-center w-full page gap-5">
        <h2 className="text-4xl font-bold">PERMISSION DENIED</h2>
        <p className="text-xl">Please log in to access this page.</p>
        <Link to="/login" className="btn btn-primary btn-outline btn-lg">
          Log In
        </Link>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="flex flex-col items-center justify-center w-full page gap-5">
        <h2 className="text-4xl font-bold">PERMISSION DENIED</h2>
        <p className="text-xl">This page can only be viewed by admin.</p>
        <Link to="/" className="btn btn-error btn-outline btn-lg">
          ← Take me back home
        </Link>
      </section>
    );
  }

  return children;
};

export const AdminOnlyLink = ({ children }) => {
  const { isAdmin } = useSelector(selectAuthSlice);

  if (isAdmin) return children;
  return null;
};

export default AdminRoute;