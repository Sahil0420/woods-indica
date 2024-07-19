import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs"; // Add this import for theme icons
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminOnlyLink } from "../adminRoute/AdminRoute";
// firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { removeActiveUser, setActiveUser } from "../../redux/slice/authSlice";
import { calculateSubtotal, calculateTotalQuantity } from "../../redux/slice/cartSlice";
import { formatPrice } from "../../utils/formatPrice";
import logo from '../../assets/drawing.svg'

const Navbar = () => {
  const { isUserLoggedIn, userName } = useSelector((store) => store.auth);
  const { totalAmount, totalQuantity, cartItems } = useSelector((store) => store.cart);
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Add this new state for theme
  const [theme, setTheme] = useState("light");

  //* Monitor currently signed USER
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (displayName == null) {
          setDisplayName(user.email.split("@")[0]);
        }
        dispatch(
          setActiveUser({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userId: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(removeActiveUser());
      }
    });
  }, []);

  // Add this new useEffect for theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  function logOutUser() {
    signOut(auth)
      .then(() => {
        toast.success("User Signed Out ");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.code, error.message);
      });
  }

  // Add this new function for toggling theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  let activeStyle = {
    borderBottom: "2px solid white",
  };

  useEffect(() => {
    dispatch(calculateTotalQuantity());
    dispatch(calculateSubtotal());
  }, [dispatch, cartItems]);

  return (
    <>
      <nav className="h-[8vh] bg-[#335139] shadow-xl ">
        <div className="navbar w-full md:w-9/12 mx-auto flex items-center justify-between">
        <section className="flex items-center">
      <Link to="/" className="flex items-center">
        <img 
          src={logo} 
          alt="WoodsIndica Logo" 
          className="h-10 w-auto object-contain mr-2" // Adjusted height and added object-contain
        />
        <h1 className="logo text-white text-lg md:text-2xl">WoodsIndica</h1>
      </Link>
    </section>
          <div>
            <ul className="flex items-center gap-x-6">
              <li className="hidden lg:block text-white text-xs md:text-xl">
                <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : null)} end>
                  Home
                </NavLink>
              </li>
              <li className="hidden lg:block text-white text-xs md:text-xl">
                <NavLink to="/all" style={({ isActive }) => (isActive ? activeStyle : null)}>
                  All Products
                </NavLink>
              </li>
              <li className="hidden lg:block text-white text-xs md:text-xl">
                <NavLink to="/contact" style={({ isActive }) => (isActive ? activeStyle : null)}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="md:gap-2 flex items-center"> {/* Added flex and items-center here */}
            {/* Add the theme toggle button here */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle mr-2"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <BsMoon size={20} color="white" />
              ) : (
                <BsSun size={20} color="white" />
              )}
            </button>

            <div className="dropdown dropdown-end ">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <AiOutlineShoppingCart size={30} color="white" />
                  <span className="badge badge-primary indicator-item">{totalQuantity}</span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 card card-compact dropdown-content w-52 bg-base-100  shadow-xl "
              >
                <div className="card-body">
                  <span className="font-bold text-lg">{totalQuantity} Items</span>
                  <span>Subtotal: {formatPrice(totalAmount)}</span>
                  <div className="card-actions">
                    <Link to="/cart" className="btn btn-primary btn-block">
                      View cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end ml-4">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="rounded-full">
                  <img
                    src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-white-blue-png-image_3918443.jpg"
                    alt="dp"
                    className="w-10 h-10 object-fill"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 "
              >
                {userName && (
                  <li className="bg-primary text-gray-200">
                    <p className="block">
                      Welcome, <span className="font-bold">{userName}</span>
                    </p>
                  </li>
                )}
                <div className="block lg:hidden">
                  <li>
                    <Link to="/" className="text-lg ">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/all" className="text-lg ">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-lg">
                      Contact Us
                    </Link>
                  </li>
                </div>

                {isUserLoggedIn ? (
                  <div>
                    <li>
                      <Link to="/my-orders" className="text-lg text-primary">
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="flex justify-between hover:bg-red-100  text-red-500 text-lg"
                        onClick={logOutUser}
                      >
                        LOGOUT
                      </Link>
                    </li>
                  </div>
                ) : (
                  <li>
                    <label htmlFor="my-modal-4" className="modal-button text-lg text-primary">
                      Login
                    </label>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <AdminOnlyLink>
        <div className="min-w-screen h-20  py-1 bg-[#335139] font-bold text-center cursor-pointer">
          <Link to="/admin/home" className="btn btn-primary btn-sm mx-4">
            VIEW DASHBOARD
          </Link>
        </div>
      </AdminOnlyLink>
    </>
  );
};

export default Navbar;