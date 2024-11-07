import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishListProduct } from "../../Redux/wishlistSlice";
import WishlistCard from "./WishlistCard";
import { Link } from "react-router-dom";
import axios from "axios";
import Popup from "../Popup/Popup";
import { getUserCartProduct } from "../../Redux/cartSlice";
import { Bounce, toast } from "react-toastify";
import Loading from "../Loading/Loading";

function WishList() {
  let dispatch = useDispatch();
  let { wishlistproduct } = useSelector((store) => store.wishlist);
  const [productId, setProductId] = useState(null);
  const [isPopup, setPopUp] = useState(false);
  const [ProductDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [deleteState, setDeleteState] = useState({});
  const [closePopup, setClosepopup] = useState(false);
  const [isFading, setIsFading] = useState(true);
  const [loadingScreen, setLoadingScreen] = useState(false);
  function closePop() {
    setDeleteState("");
    setClosepopup(true);
    setTimeout(() => {
      setPopUp(false);
      setClosepopup(false);
    }, 100);
  }

  function ConfirmdeletItemformCart(id, title) {
    setProductDetails({ id, title });
    setPopUp(true);
  }
  function deleteProductFromWishlist() {
    axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${ProductDetails.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setDeleteState({ message: res.data.message, status: res.data.status });
        dispatch(getUserWishListProduct());
        setTimeout(() => closePop(), 500);
      })
      .catch(() => {
        setDeleteState({
          message: "failed To Delete Item From WishList",
          status: "fail",
        });
      });
  }

  async function addProductToCart(id) {
    setProductId(id);
    setIsLoading(true);
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
    setIsLoading(false);
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
  }

  useEffect(() => {
    setLoadingScreen(true);
    dispatch(getUserWishListProduct()).then(() => {
      setIsFading(false);
      setTimeout(() => setLoadingScreen(false), 500);
    });
  }, []);
  return (
    <>
      {loadingScreen && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-100 flex justify-center z-50  items-center text-pink-600 transition   duration-500 ${
            !isFading && "opacity-0 "
          }`}
        >
          <Loading />
        </div>
      )}
      <div className="conatiner cart-cont  w-11/12 mx-auto my-10">
        <h1 className="text-2xl uppercase  relative head">
          Your WishList Items{" "}
        </h1>

        {wishlistproduct.length > 0 ? (
          <div className="wishlist-cont cards-item grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2  px-1 md:px-10 justify-between items-baseline md:gap-10  gap-y-12  sm:gap-y-10 gap-x-4 my-10">
            {wishlistproduct.map((product, index) => (
              <WishlistCard
                product={product}
                deleteProductFromWishlist={ConfirmdeletItemformCart}
                addProductToCart={addProductToCart}
                isLoading={isLoading}
                productId={productId}
                key={index}
              />
            ))}
            <Popup trigger={isPopup} closePopup={closePopup} close={closePop}>
              <h2 className="text-center py-4 font-medium text-lg text-neutral-800">
                {" "}
                Delete {ProductDetails.title} From Your WishList
              </h2>
              <p className="text-center text-neutral-700 text-sm py-1">
                Are You Sure?
              </p>
              {isLoading && (
                <i className="fas fa-spinner fa-spin py-2 text-neutral-900 text-center text-lg block"></i>
              )}
              {deleteState.status == "success" ? (
                <p className="text-green-600 py-2 text-center">
                  {deleteState.message}
                </p>
              ) : (
                <p className="text-red-600 py-2 text-center">
                  {deleteState.message}
                </p>
              )}

              <button
                className={`text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm  py-2 w-1/3 block   mx-auto mb-5  text-center ${
                  isLoading &&
                  "bg-red-800 bg-opacity-80 cursor-not-allowed hover:bg-opacity-80"
                }`}
                disabled={isLoading}
                onClick={deleteProductFromWishlist}
              >
                Delete
              </button>
            </Popup>
          </div>
        ) : (
          <p className="text-2xl mt-10 mb-5 text-center font-semibold">
            Your WishList Is Empty{" "}
            <Link
              className="text-red-700 text-xl underline   rounded-lg  cursor-pointer"
              to={"/"}
            >
              {" "}
              Add Item to Your WishList{" "}
            </Link>
          </p>
        )}
      </div>
    </>
  );
}

export default WishList;
