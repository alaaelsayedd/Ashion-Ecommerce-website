import ProductCard from "./ProductCard";

function Product({ products }) {
  console.log(products);
  return (
    <>
      <div className="my-12  w-full  md:w-4/5 mx-auto p-2 ">
        <h2 className="text-2xl mb-8 font-medium uppercase relative py-2 after:content-['']  after:absolute after:h-1 after:bg-red-700 after:bottom-0 after:left-0 after:w-28 after:rounded-sm  ">
          New Products
        </h2>
        <div className="container grid-cols-2 grid   md:grid-cols-3  lg:grid-cols-4  gap-x-5 gap-y-6 items-baseline">
          {products.map((product, index) => {
            return (
              <ProductCard
                image={product.imageCover}
                title={product.title}
                price={product.price}
                rate={product.ratingsAverage}
                key={index}
                id={product.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Product;
