import axios from "axios";
import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserWishListProduct } from "../../Redux/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserCartProduct } from "../../Redux/cartSlice";
import { Bounce, toast } from "react-toastify";

function ProductDetails() {
  let dispatch = useDispatch();
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [imgeView, setImageView] = useState(null);
  const [index, setIsFocusIndex] = useState(0);
  const { isLogggedin } = useSelector((store) => store.auth);
  let { wishlistproduct } = useSelector((store) => store.wishlist);
  const [wishlistIds, setWishlistIds] = useState([]);
  const navigate =useNavigate();

  async function getProductDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
    setImageView(data.data.imageCover);
  }
  async function addProductToWishlist() {
    if (isLogggedin) {
      // Check if product is already in the wishlist
      if (!wishlistproduct.find((item) => item.id == id)) {
        setWishlistIds([...wishlistIds, id]);
        let { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          {
            productId: id,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
      } else {
        // Remove product from wishlist
        setWishlistIds(wishlistIds.filter((item) => item != id));
        let { data } = await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
      }
      dispatch(getUserWishListProduct());
      // Refresh wishlist products
    } else {
      navigate("/login");
    }
  }
  function setlovedProduct() {
    return wishlistIds.find((item) => item == id) ? true : false;
  }
  async function addProductToCart() {
    if (isLogggedin) {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      dispatch(getUserCartProduct());

      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      navigate("/login");
    }
  }
  useEffect(() => {
    if (isLogggedin) {
      dispatch(getUserWishListProduct());
    }
  }, []);

  useEffect(() => {
   
    getProductDetails();
    window.scrollTo(0,0)
  }, [id]);
  return (
    <>
      <div
        className="conatiner flex flex-col lg:flex-row py-20 w-3/4 mx-auto gap-5"
      
      >
        <div className="images lg:w-1/2 md:w-10/12 mx-auto  w-full">
          <div className="imge-big h-72">
            <img
              src={imgeView == "" ? productDetails.imageCover : imgeView}
              alt={productDetails.title}
              className="h-full w-full object-contain"
            />
          </div>
          <div className=" grid md:grid-cols-5  grid-cols-4 gap-5  h-16 md:h-36 my-5">
            {productDetails.images?.map((imge, key) => {
              return (
                <div
                  className={
                    index == key
                      ? "imge-small   cursor-pointer border-2 border-blue-500 hover focus:border-blue-500 rounded-md "
                      : "imge-small  cursor-pointer border-2 border-neutral-300 rounded-md hover:border-blue-500 hover focus:border-blue-500 "
                  }
                  onClick={() => {
                    setImageView(imge);
                    setIsFocusIndex(key);
                  }}
                  key={key}
                >
                  <img
                    src={imge}
                    alt="imge"
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="content flex flex-col gap-4 w-full lg:w-1/2">
          <h2 className="py-2 text-3xl font-medium  text-neutral-800">
            {productDetails.title}
          </h2>
          <p className="text-lg text-neutral-700 font-medium">
            {productDetails.description}
          </p>

          <p>
            <span className="font-semibold text-neutral-800">Price:</span>
            {productDetails.price}$
          </p>

          <p>
            <span className="font-semibold text-neutral-800">Brand:</span>
            {productDetails.brand?.name}
          </p>
          <p>
            <span className="font-semibold text-neutral-800">Category:</span>
            {productDetails.category?.name}
          </p>
          <p className="flex items-baseline">
            <span className="font-semibold text-neutral-800">Rate:</span>
            {productDetails?.ratingsAverage}
            <i class="fa-solid fa-star px-1 text-yellow-400 text-sm"></i>
          </p>
          <div className="flex justify-between items-center gap-4 ">
            <button
              onClick={addProductToCart}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-1/2   px-8 py-2.5 text-center my-5"
            >
              Add To Cart
            </button>
            <i
              onClick={addProductToWishlist}
              className={` fa-heart text-2xl cursor-pointer border rounded-md p-1 border-neutral-600 ${
                setlovedProduct()
                  ? " fa-solid    text-red-700 "
                  : " fa-regular text-neutral-800"
              }`}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
