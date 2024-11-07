import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [isFading, setIsFading] = useState(true);
  async function getUserOrder() {
    setLoadingScreen(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${
        jwtDecode(localStorage.getItem("token")).id
      }`
    );
    setOrders(data);
    setIsFading(false);
    setTimeout(() => {
      setLoadingScreen(false);
    }, 500);
   
  }
  useEffect(() => {
    getUserOrder();
  },[]);

  return (
   <>
    {loadingScreen && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-100 flex justify-center  z-50  items-center text-pink-600 transition   duration-500 ${
            !isFading ? "opacity-0 ": "opacity-100"
          }`}
        >
          <Loading />
        </div>
      )}
  
    <div className="conatiner marker w-full px-2 lg:w-10/12 mx-auto my-10  ">
      <h1 className="text-2xl uppercase  relative head my-5"> Your Orders</h1>

      {orders?.map((order, index) => (
        <div
          className="order bg-neutral-50 p-5 rounded-sm my-2 flex flex-col gap-2 text-neutral-700"
          key={index}
        >
          <h4 className="text-2xl  my-4">OrderNo {order.id}</h4>
          <p className="font-medium">
            CreatedAt:{" "}
            <span className="px-1 font-normal">{order.createdAt}</span>
          </p>

          <p className="font-medium">
            isPaid:
            <span className="px-1 font-normal">
              {order.isPaid ? "Yes" : "No"}
            </span>
          </p>
          <p className="font-medium">
            PaidAt:
            <span className="px-1 font-normal">{order.paidAt}</span>
          </p>
          <p className="font-medium">
            PaymentMethodType :
            <span className="px-1 font-normal">{order.paymentMethodType}</span>
          </p>
          <p className="font-medium">
            totalOrderPrice :
            <span className="px-1 font-normal">{order.totalOrderPrice} EG</span>
          </p>
          <p className="font-medium">
            isDelivered :
            <span className="px-1 font-normal">
              {Order.isDelivered ? "Yes" : "No"}{" "}
            </span>
          </p>
          <p className="font-medium text-lg head relative">Order Products</p>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4   order-div ">
            {order.cartItems.map((item,index) => (
              <div className="flex my-2 md:gap-2 items-center" key={index}>
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="h-full  w-1/3 sm:w-1/2 object-contain block"
                />

                <div className="flex flex-col gap-1 text-sm">
                  <p className="font-medium">{item.product.title.split(" ").slice(0, 5).join(" ")}</p>
                  <p>price: {item.price}EG</p>
                  <p >count: {item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Order;
