import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import ProductCard from "../Product/ProductCard";

function Shop() {
  const [isFading, setIsFading] = useState(true);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [products, setProduct] = useState([]);

  useEffect(() => {
    (async function () {
      setIsFading(true);
      setLoadingScreen(true);
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      setProduct(data.data);

      setIsFading(false);
      setTimeout(() => setLoadingScreen(false), 300);
    })();
  }, []);
  return (
    <>
      {loadingScreen ? (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-100 flex justify-center items-center text-pink-600 transition   duration-1000 ${
            !isFading ? "opacity-0 " : "opacity-100 "
          }`}
        >
          <Loading />
        </div>
      ) : (
        <div className="my-12  w-full  md:w-4/5 mx-auto p-2 ">
          <h2 className="sm:text-2xl text-lg mb-8 font-medium uppercase relative head  ">
            ALL Products
          </h2>
          <div className="container grid-cols-2 sm:grid-cols-2 grid     lg:grid-cols-5  gap-x-5 gap-y-6 items-baseline">
            {products?.map((product, index) => {
              return <ProductCard product={product} key={index} />;
            })}

            {products == [] && (
              <p className="text-center text-xl py-5 font-bold">
                No Products Found
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Shop;
