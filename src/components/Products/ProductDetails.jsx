import { doc, getDoc } from "firebase/firestore";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import Loader from "../loader/Loader";
import ReviewComponent from "../review/ReviewComponent";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCart,
  calculateTotalQuantity,
} from "../../redux/slice/cartSlice";
import useFetchReviews from "../../hooks/useFetchReviews";

const ProductDetails = () => {
  const { cartItems } = useSelector((store) => store.cart);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { reviews, isLoadingReviews } = useFetchReviews();

  const filteredReviews = reviews.filter((item) => item.productId === id);

  async function getSingleDocument() {
    setIsLoading(true);
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct(docSnap.data());
      setIsLoading(false);
    } else {
      // console.log("No such document!");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSingleDocument();
  }, []);

  function add2CartFunction(product) {
    dispatch(addToCart({ ...product, id }));
    dispatch(calculateTotalQuantity());
  }

  function decreaseQty(product) {
    dispatch(decreaseCart({ ...product, id }));
    dispatch(calculateTotalQuantity());
  }

  let currentItem = cartItems.find((item) => item.id === id);

  return (
    <>
      {isLoading && <Loader />}
      <Breadcrumbs type={product.name} />
      <section className="w-full mx-auto p-4 md:p-10 lg:w-9/12 md:px-6 ">
        <h1 className="text-2xl text-primary font-semibold">Product Details </h1>
        <Link to="/all" className="link text-gray-600 ">
          &larr; Back to All Products
        </Link>
        <article className="flex flex-col md:flex-row items-start justify-between py-4 gap-x-4">
          <div className="w-full md:w-1/3 flex items-center justify-center border-2">
            <LazyLoadImage
              src={product.imgUrl}
              alt={product.productName}
              className="w-96 h-96 object-contain "
              placeholderSrc="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
              effect="blur"
            />
          </div>
          <div className="flex-1">
            <h1
              className="text-3xl text-primary mb-2"
              style={{ textTransform: "capitalize" }}
            >
              {product.productName}
            </h1>
            <h2 className="text-primary px-2 py-2 max-w-max font-bold text-lg md:text-2xl mb-2">
              {formatPrice(product.price)}
            </h2>
            <p className="text-gray-500 mb-2">{product.description}</p>
            <p className="font-semibold mb-2"></p>
            {currentItem ? (
              <div className="btn-group items-center mb-2">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => decreaseQty(product)}
                >
                  {" "}
                  -
                </button>
                <button className="btn btn-lg btn-ghost disabled">
                  {currentItem.qty}
                </button>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => add2CartFunction(product)}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="btn btn-primary btn-active"
                onClick={() => add2CartFunction(product)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </article>
        <section className="rounded-md shadow-lg">
          <div className="w-full">
            <h1 className="text-lg md:text-2xl text-primary font-semibold mt-2 p-2">
              Reviews
            </h1>
          </div>
          {!filteredReviews.length ? (
            <p className="p-4">
              <Link to={`/review-product/${id}`} className="link link-primary">
                Be the first one to review this product
              </Link>
            </p>
          ) : (
            <div className="flex flex-col gap-4 p-2">
              {filteredReviews.map((review, index) => (
                <ReviewComponent review={review} key={index} />
              ))}
              <Link to={`/review-product/${id}`}>
                <i className="ri-add-circle-line"></i>Add Review
              </Link>
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default ProductDetails;
