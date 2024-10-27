function WishlistCard({
  product,
  deleteProductFromWishlist,
  addProductToCart,
  isLoading,
  productId

}) {

  return (
    <>
      <div className="flex gap-x-5">
        <div className="  w-1/3  ">
          <img
            src={product.imageCover}
            alt={product.title}
            className=" w-full h-full object-contain "
          />
        </div>
        <div className="content w-2/3 text-neutral-800  flex flex-col md:gap-2 gap-y-1 text-sm sm:text-base">
          <h3 className="md:text-lg font-medium  ">
            {product.title.split(" ").slice(0, 3).join(" ")}
          </h3>
          <p className="text-neutral-700">{product.price}EG</p>
          <div className="btns  flex justify-between items-center  my-5 ">
            <button
              className="sm:px-2 px-[3px] text-xs font-medium   sm:font-semibold text-white bg-red-700 py-1 rounded-sm hover:bg-red-800 flex sm:gap-2 gap-1 "
              onClick={() => addProductToCart(product._id)}
            >
              {isLoading && productId==product._id ? (
                <i className="fas fa-spin fa-spinner"></i>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4  "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>{" "}
                  Add To Cart
                </>
              )}
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              onClick={() =>
                deleteProductFromWishlist(product._id, product.title)
              }
              className="size-5 text-red-700 me-1 md:me-2 cursor-pointer"
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
    </>
  );
}

export default WishlistCard;
