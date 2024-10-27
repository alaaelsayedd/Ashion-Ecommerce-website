import axios from "axios";
import { useEffect, useState } from "react";
import "./cart.css";
import Popup from "../Popup/Popup";
import CartCard from "./CartCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCartProduct,
  setCartCount,
  setCartProducts,
  settotalCartPrice,
} from "../../Redux/cartSlice";

function Cart() {
  let { cartProducts, totalCartPrice } = useSelector((store) => store.cart);
  let dispatch = useDispatch();
  const [isPopup, setPopUp] = useState(false);
  const [ProductDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [deleteState, setDeleteState] = useState({});
  const [closePopup, setClosepopup] = useState(false);
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
  function deleteItemFromCart() {
    setDeleteState({});
    setIsLoading(true);
    if (
      ProductDetails.id == undefined &&
      ProductDetails.title == " All Items "
    ) {
      axios
        .delete("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setIsLoading(false);
          setDeleteState({
            message: "Items Sucessfully Deleted ",
            status: true,
          });
          setTimeout(() => {
            closePop();
            dispatch(setCartProducts([]));
            dispatch(setCartCount(0));
          }, 1000);
        })
        .catch(() => {
          setIsLoading(false);
          setDeleteState({
            message: "Fail Delete Items From cart",
            status: false,
          });
        });
    } else {
      axios
        .delete(
          `https://ecommerce.routemisr.com/api/v1/cart/${ProductDetails.id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          dispatch(setCartCount(res.data.numOfCartItems));
          dispatch(setCartProducts(res.data.data.products));
          dispatch(settotalCartPrice(res.data.data.totalCartPrice));
          setIsLoading(false);
          setDeleteState({ message: "Item Sucessfully Deleted", status: true });
          setTimeout(() => {
            closePop();
          }, 1000);
        })
        .catch(() => {
          setIsLoading(false);
          setDeleteState({ message: "Fail Delete Item", status: false });
        });
    }
  }
  async function updateCartQuantity(count, id) {
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    dispatch(setCartProducts(data.data.products));
    dispatch(settotalCartPrice(data.data.totalCartPrice));
  }

  useEffect(() => {
    dispatch(getUserCartProduct());
  }, []);
  return (
    <>
      <div className="conatiner cart-cont  w-11/12 mx-auto my-10">
        <h1 className="text-2xl uppercase  relative head">Your Cart Items </h1>
        {cartProducts.length > 0 ? (
          <>
            <div className="flex justify-end items-baseline gap-3">
              <p className="text-neutral-800 text-lg">
                TotalPrice : {totalCartPrice}
                <span className="text-sm "> EG</span>
              </p>
              <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  p-2    text-center ">
                CheckOut
              </button>
            </div>
            <div className="cards-item grid lg:grid-cols-3 grid-cols-2  px-1 md:px-10 justify-between items-baseline md:gap-10  gap-y-12  sm:gap-y-10 gap-x-4 my-10">
              {cartProducts.map((product, index) => (
                <CartCard
                  product={product}
                  key={index}
                  ConfirmdeletItemformCart={ConfirmdeletItemformCart}
                  updateCartQuantity={updateCartQuantity}
                />
              ))}
              <Popup trigger={isPopup} closePopup={closePopup} close={closePop}>
                <h2 className="text-center py-4 font-medium text-lg text-neutral-800">
                  {" "}
                  Delete {ProductDetails.title} From Cart
                </h2>
                <p className="text-center text-neutral-700 text-sm py-1">
                  Are You Sure?
                </p>
                {isLoading && (
                  <i className="fas fa-spinner fa-spin py-2 text-neutral-900 text-center text-lg block"></i>
                )}
                {deleteState.status ? (
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
                  onClick={deleteItemFromCart}
                >
                  Delete
                </button>
              </Popup>
            </div>
            <button
              className="text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm  py-2 w-1/5 block  mx-auto  text-center "
              onClick={() => {
                setProductDetails({ title: " All Items " });
                setPopUp(true);
              }}
            >
              Clear Cart
            </button>
          </>
        ) : (
          <p className="text-2xl mt-10 mb-5 text-center font-semibold">
            Your Cart Is Empty{" "}
            <Link
              className="text-red-700 text-xl underline   rounded-lg  cursor-pointer"
              to={"/"}
            >
              {" "}
              Shop Now{" "}
            </Link>
          </p>
        )}
      </div>
    </>
  );
}

export default Cart;
