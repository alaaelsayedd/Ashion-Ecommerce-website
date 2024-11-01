import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";

function Checkout() {
  const { cartId } = useSelector((store) => store.cart);
  console.log(cartId);
  const checkoutSchema = Yup.object({
    details: Yup.string()
      .min(5, "Enter A vaild Adress")
      .required("Address is Required"),
    phone: Yup.string()
      .matches(/^01[0-2,5]\d{8}$/, "Enter Vaild Phone Number")
      .required("Phone is Required"),
    city: Yup.string()
      .min(5, "Enter vaild City Name")
      .required("City Is Required"),
  });
  console.log();
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: () => {
      axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173/order`,
          {
            shippingAddress: formik.values,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => (window.location.href = res.data.session.url))
        .catch((err) => console.log(err));
    },
  });
  return (
    <div className="conatiner marker  w-10/12 mx-auto my-10  ">
      <h1 className="text-2xl uppercase  relative head">Check out </h1>
      <div className="  w-3/4 mx-auto  flex justify-center p-10">
        <form className="mx-auto w-full " onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="Address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Address
            </label>
            <input
              type="text"
              id="Address"
              name="details"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              placeholder="Your Address"
              onChange={formik.handleChange}
              value={formik.values.details}
            />
            {formik.errors.details && formik.touched.details ? (
              <div className="text-xs  text-red-700">
                {formik.errors.details}
              </div>
            ) : null}
          </div>
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="text-xs text-red-700">{formik.errors.phone}</div>
            ) : null}
          </div>

          <div className="mb-2">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            {formik.errors.city && formik.touched.city ? (
              <div className="text-xs text-red-700">{formik.errors.city}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className={
              "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-1/2  my-7  px-8 py-2.5 text-center"
            }
          >
            {/* {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : ( */}
            <span> Check out</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
