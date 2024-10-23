import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [imgeView, setImageView] = useState(null);
  const [index, setIsFocusIndex] = useState(0);
  async function getProductDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
    setImageView(data.data.imageCover);
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);
  return (
    <>
      <div className="conatiner flex my-20 w-3/4 mx-auto gap-5">
        <div className="images w-1/2">
          <div className="imge-big h-72">
            <img
              src={imgeView == "" ? productDetails.imageCover : imgeView}
              alt={productDetails.title}
              className="h-full w-full object-contain"
            />
          </div>
          <div className=" grid grid-cols-4  gap-3 h-36 my-5">
            {productDetails.images?.map((imge, key) => {
              return (
                <div
                  className={
                    index == key
                      ? "imge-small  cursor-pointer border-2 border-blue-500 hover focus:border-blue-500 rounded-md "
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
        <div className="content flex flex-col gap-4 w-1/2">
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
          <div className="flex justify-between items-baseline">
            <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-1/2   px-8 py-2.5 text-center my-5">
              Add To Cart
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-8 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
