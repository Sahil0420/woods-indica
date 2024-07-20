import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { categories } from "../../utils/adminProductCategories";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import { storage, db } from "../../firebase/config";
import { useSelector } from "react-redux";

const AddProducts = () => {
  const navigate = useNavigate();
  const { id: paramsId } = useParams();
  const { products: reduxProducts } = useSelector((store) => store.product);
  const productEdit = reduxProducts.find((item) => item.id === paramsId);

  const [product, setProduct] = useState({
    productName: "",
    price: "",
    category: "",
    description: "",
    shortDescription: "",
    imgUrl: "",
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (productEdit && paramsId !== "ADD") {
      setProduct({
        productName: productEdit.productName || "",
        price: productEdit.price || "",
        category: productEdit.category || "",
        description: productEdit.description || "",
        shortDescription: productEdit.shortDescription || "",
        imgUrl: productEdit.imgUrl || "",
      });
    }
  }, [productEdit, paramsId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `productImages/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct((prev) => ({ ...prev, imgUrl: downloadURL }));
          toast.success("Image uploaded successfully");
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const slug = product.productName.toLowerCase().replace(/ /g, "-");
      const productData = {
        ...product,
        price: Number(product.price),
        slug,
        createdAt: Timestamp.now().toDate(),
      };

      if (paramsId === "ADD") {
        await addDoc(collection(db, "products"), productData);
        toast.success("Product added successfully");
      } else {
        if (product.imgUrl !== productEdit.imgUrl) {
          const storageRef = ref(storage, productEdit.imgUrl);
          await deleteObject(storageRef);
        }
        await setDoc(doc(db, "products", paramsId), {
          ...productData,
          editedAt: Timestamp.now().toDate(),
        });
        toast.success("Product updated successfully");
      }

      navigate("/admin/all-products");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = Object.values(product).every(Boolean);

  return (
    <>
      {isLoading && <Loader />}
      <main className="h-full border-r-2">
        <h1 className="text-xl md:text-3xl  font-semibold pb-3">
          {paramsId === "ADD" ? "Add New Product" : "Edit Product"}
        </h1>
        <form className="form-control" onSubmit={handleSubmit}>
          <div className="py-2">
            <label className="label-text text-neutral font-bold mb-2 block text-lg">
              Product Name:
            </label>
            <input
              className="input text-black input-bordered max-w-lg w-full border-2"
              type="text"
              placeholder="Product Name"
              required
              name="productName"
              value={product.productName}
              onChange={handleInputChange}
            />
          </div>

          <div className="py-2">
            <label className="label-text text-neutral font-bold mb-2 block text-lg">
              Product Price:
            </label>
            <input
              className="input text-black input-bordered max-w-lg w-full border-2"
              type="number"
              placeholder="Product Price"
              required
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="py-2">
            <label className="label-text text-neutral font-bold mb-2 block text-lg">
              Product Category:
            </label>
            <select
              className="select text-black select-bordered w-full max-w-lg"
              required
              name="category"
              value={product.category}
              onChange={handleInputChange}
            >
              <option value="">-- Choose a Product Category --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="py-2">
            <label className="label-text text-neutral font-bold mb-2 block text-lg">
              Product Description:
            </label>
            <textarea
              className="textarea text-black textarea-bordered h-32 max-w-lg w-full"
              placeholder="Product Description"
              required
              name="description"
              value={product.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="py-2">
            <label className="label-text text-neutral font-bold mb-2 block text-lg">
              Short Description:
            </label>
            <input
              className="input text-black input-bordered max-w-lg w-full border-2"
              type="text"
              placeholder="Short Description"
              required
              name="shortDescription"
              value={product.shortDescription}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label-text  text-neutral font-bold mb-2 block text-lg">
              Product Image:
            </label>
            <div className="border-2 rounded-sm max-w-xl w-full px-4 pb-2">
              <progress
                className="progress progress-primary w-44 md:w-72 xl:w-full"
                value={uploadProgress}
                max="100"
              ></progress>
              <input
                className="max-w-lg w-full"
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
              {product.imgUrl && <div className="flex justify-center h-80 w-100"><img src={product.imgUrl} className="  " /></div>}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-background text-lg max-w-[200px] mt-2"
            disabled={!isFormValid}
          >
            {paramsId === "ADD" ? "Add Product" : "Update Product"}
          </button>
        </form>
      </main>
    </>
  );
};

export default AddProducts;
