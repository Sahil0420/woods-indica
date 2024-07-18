import { useEffect, useState } from "react";
import { toast } from "react-toastify";
//Firebase
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const useFetchReviews = () => {
  const [reviews, setReviews] = useState([]); // Rename 'data' to 'reviews'
  const [isLoading, setIsLoading] = useState(false);

  function fetchReviewsCollection() {
    setIsLoading(true);
    try {
      const reviewsRef = collection(db, "reviews"); // Use 'reviews' collection
      // Sort by createdAt in descending order to show newest reviews first
      const q = query(reviewsRef, orderBy("createdAt", "desc")); 
      onSnapshot(q, (querySnapshot) => {
        const allReviews = []; 
        querySnapshot.forEach((doc) => {
          allReviews.push({ id: doc.id, ...doc.data() });
        });
        setReviews(allReviews); // Update the 'reviews' state
        setIsLoading(false);
      });
    } catch (error) {
      toast.error(error.code, error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchReviewsCollection();
  }, []);

  return { reviews, isLoading };
};

export default useFetchReviews;