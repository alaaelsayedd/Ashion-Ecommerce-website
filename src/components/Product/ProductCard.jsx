import { useNavigate } from "react-router-dom";
import "./product.css";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
function ProductCard({
  image,
  title,
  price,
  rate,
  id,
  addProductToCart,
  addProductToWishlist,
  wishlistIds,
}) {
  const navigate = useNavigate();
  function getProductDetails(id) {
    navigate(`/product/${id}`);
  }
  function setlovedProduct() {
    return wishlistIds.find((product) => product.id == id) ? true : false;
  }

  return (
    <>
      <AnimatePresence mode="wait" className="w-full">
        <motion.div
          key={title}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="imge cursor-pointer ">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
            <div className="product-icons flex justify-center gap-2   transition-all duration-700">
              <div className="h-10 w-10 rounded-full border border-neutral-700  flex justify-center items-center text-neutral-700  hover:border-red-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                  onClick={() => addProductToCart(id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
              <div
                className={`h-10 w-10 rounded-full border border-neutral-700  flex justify-center items-center ${
                  setlovedProduct()
                    ? "bg-red-800 text-white  border-opacity-0"
                    : " text-neutral-700 hover:border-red-800 border-opacity-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                  onClick={() => addProductToWishlist(id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </div>
              <div
                className="h-10 w-10 rounded-full border border-neutral-700  flex justify-center items-center text-neutral-700 hover:border-red-800"
                onClick={() => getProductDetails(id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-neutral-800 py-4 min-h-24">
            {title}
          </p>
          <div className="flex justify-between px-5 flex-row-reverse">
            <p className="flex items-baseline">
              {rate}
              <i className="fa-solid fa-star px-1 text-yellow-400 text-sm"></i>
            </p>
            <p className="font-bold">{price}$</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default ProductCard;
