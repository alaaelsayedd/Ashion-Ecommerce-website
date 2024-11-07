import { useEffect, useState } from "react";

function CartCard({ product, ConfirmdeletItemformCart, updateCartQuantity }) {
  const [count, setCount] = useState(product.count);
  const [disableButton, setDisable] = useState(false);
  useEffect(() => {
    if (count <= 1) {
      setDisable(true);
    }
    else{
        setDisable(false)
    }
  });
  return (
    <div className="flex gap-x-5 py-5">
      <div className="  w-1/3   ">
        <img
          src={product.product.imageCover}
          alt={product.product.title}
          className=" w-full h-40 object-contain "
        />
      </div>
      <div className="content w-2/3 text-neutral-800  flex flex-col md:gap-2 gap-y-1 text-sm sm:text-base">
        <h3 className="md:text-lg font-medium  ">
          {product?.product.title?.split(" ").slice(0, 3).join(" ")}
        </h3>
        <p className="text-neutral-700">{product.price}EG</p>
        <div className="btns  flex justify-between items-center ">
          <div className="flex  gap-2">
            <button
              className="border border-neutral-600 px-1 rounded-xl text-neutral-800"
              onClick={() => {
                setCount(count + 1);
                updateCartQuantity(count + 1, product.product.id);
              }}
            >
              +
            </button>
            <p>{count}</p>
            <button
              className={`border border-neutral-600 px-1 rounded-xl  text-neutral-800 ${
                disableButton
                  ? "cursor-not-allowed text-neutral-500 border-neutral-500  opacity-90"
                  : ""
              }`}
              disabled={disableButton}
              onClick={() => {
                setCount(count - 1);
                updateCartQuantity(count - 1, product.product.id);
              }}
            >
              -
            </button>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-red-700 me-1 md:me-2 cursor-pointer"
            onClick={() =>
              ConfirmdeletItemformCart(
                product.product.id,
                product.product.title
              )
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
