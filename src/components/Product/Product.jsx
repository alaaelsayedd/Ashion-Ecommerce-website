import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { authContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUserCartProduct } from "../../Redux/cartSlice";
import { getUserWishListProduct } from "../../Redux/wishlistSlice";
import Loading from "../Loading/Loading";

function Product({
  products,
  categories,
  getCategoryProduct,
  getProduct,
  loadingProduct,
  isFading,
}) {
  let dispatch = useDispatch();
  const [selecttab, setSelectTab] = useState("all");
  const { isLogggedin } = useContext(authContext);
  let { wishlistproduct } = useSelector((store) => store.wishlist);
  const [wishlistIds, setWishlistIds] = useState([]);

  const navigate = useNavigate();
  function displayCtaegoryExist() {
    let categoriesExist = categories.filter(
      (category) =>
        category.name == "Men's Fashion" ||
        category.name == "Women's Fashion" ||
        category.name == "Electronics"
    );

    return categoriesExist;
  }

  async function addProductToWishlist(id) {
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

  async function addProductToCart(id) {
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
    if(isLogggedin)
    {
      setWishlistIds(wishlistproduct.map((product) => product.id));
    }
    else{
      setWishlistIds([])
    }
  
  }, [wishlistproduct,isLogggedin]);
  return (
    <>
      <div className="my-12  w-full  md:w-4/5 mx-auto p-2 ">
        <div className=" md:flex justify-between items-baseline  ">
          <h2 className="text-2xl mb-8 font-medium uppercase relative head  ">
            New Products
          </h2>
          <nav>
            <ul className="flex gap-10  font-semibold text-sm nav-tab my-3 md:my-0">
              <li
                className={`cursor-pointer ${
                  selecttab == "all" &&
                  "after:content-['']  relative after:absolute after:h-[2px] after:bg-red-700 after:bottom-0 after:left-0 after:right-0  after:rounded-sm "
                }`}
                onClick={() => {
                  getProduct();
                  setSelectTab("all");
                }}
              >
                All
              </li>
              {displayCtaegoryExist().map((category, key) => (
                <li
                  className={`cursor-pointer ${
                    selecttab == category.name &&
                    "after:content-['']  relative after:absolute after:h-[2px] after:bg-red-700 after:bottom-0 after:left-0 after:right-0  after:rounded-sm  "
                  }`}
                  key={key}
                  onClick={() => {
                    getCategoryProduct(category._id);
                    setSelectTab(category.name);
                  }}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {loadingProduct ? (
          <div
            className={`container h-72 flex justify-center items-center transition duration-300  transform ${
              !isFading ? "opacity-0 scale-0 " : "opacity-100  scale-75"
            }`}
          >
            <Loading />
          </div>
        ) : (
          <div className="container grid-cols-2 grid   md:grid-cols-3  lg:grid-cols-4  gap-x-5 gap-y-6 items-baseline">
            {products?.map((product, index) => {
              return (
                <ProductCard
                  product={product}
                  key={index}
                  addProductToCart={addProductToCart}
                  addProductToWishlist={addProductToWishlist}
                  wishlistIds={wishlistIds}
                />
              );
            })}

            {products == [] && (
              <p className="text-center text-xl py-5 font-bold">
                No Products Found
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Product;
