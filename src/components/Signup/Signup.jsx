import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
function Signup() {
  const [errormessage, setErrorMessage] = useState("");
  const [isLoading, setLoadingStae] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Enter vaild name more than 3 char")
      .max(20, "Enter vaild name less than 20 char")
      .required("name is required"),
    email: Yup.string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter vaild  Email Please")
      .required("Email is Required"),
    password: Yup.string()
      .matches(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "password must contain at least eight characters at least one number both lower and uppercase letters at least one special characters, #, ?, !."
      )
      .required("password is Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "not matched")
      .required("Repaete password is Required"),
    phone: Yup.string()
      .matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/, "phone number is wrong")
      .required("Phone is Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: () => {
      setErrorMessage("");
      setLoadingStae(true);
      axios
        .post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          formik.values
        )
        .then((res) => {
          setLoadingStae(false);
          navigate("/login");
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
          setLoadingStae(false);
        });
    },
  });
  return (
    <div className="container my-10 w-[75%] mx-auto p-3 border shadow-sm  ">
      <h1 className="text-2xl text-neutral-800 ">Register Now</h1>
      <form class="mx-auto p-6 " onSubmit={formik.handleSubmit}>
        <div class="grid md:grid-cols-2 md:gap-6 my-3">
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-red-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={isLoading}
            />
            <label
              for="name"
              class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full name
            </label>
            {formik.errors.name && formik.touched.name ? (
              <div className="text-xs  text-red-700">{formik.errors.name}</div>
            ) : null}
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="floating_phone"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-red-600 peer"
              placeholder=" "
              value={formik.values.phone}
              onChange={formik.handleChange}
              disabled={isLoading}
            />
            <label
              for="floating_phone"
              class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
            {formik.errors.phone && formik.touched.phone ? (
              <div className="text-xs  text-red-700">{formik.errors.phone}</div>
            ) : null}
          </div>
        </div>
        <div class="relative z-0 w-full my-5 group">
          <input
            type="email"
            name="email"
            id="floating_email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            value={formik.values.email}
            onChange={formik.handleChange}
            disabled={isLoading}
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div className="text-xs  text-red-700">{formik.errors.email}</div>
          ) : null}
        </div>
        <div class="relative z-0 w-full my-5 group">
          <input
            type="password"
            name="password"
            id="floating_password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.password}
            disabled={isLoading}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div className="text-xs  text-red-700">
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div class="relative z-0 w-full my-5 group">
          <input
            type="password"
            name="rePassword"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            disabled={isLoading}
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="text-xs  text-red-700">
              {formik.errors.rePassword}
            </div>
          ) : null}
          {errormessage && (
            <div className="text-s  text-red-700 text-center p-3">
              {errormessage}
            </div>
          )}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-1/2 px-5 py-2.5 text-center mt-5  "
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <span> SignUp</span>
          )}
        </button>
        <p className="text-sm text-neutral-800">
          {" "}
          Already Have An Account ?{" "}
          <Link className="underline" to={"/login"}>
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
