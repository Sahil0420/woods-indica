import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      // For orders, we might want to sort by createdAt in descending order
      const q = query(docRef, orderBy("createdAt", "desc"));
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const allData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(`Fetched ${collectionName}:`, allData);
        setData(allData);
        setIsLoading(false);
      }, (error) => {
        console.error(`Error fetching ${collectionName}:`, error);
        toast.error(`Error fetching ${collectionName}. Please try again.`);
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error(`Error setting up ${collectionName} listener:`, error);
      toast.error(`Error setting up ${collectionName} listener. Please try again.`);
      setIsLoading(false);
    }
  }, [collectionName]);

  return { data, isLoading };
};

export default useFetchCollection;