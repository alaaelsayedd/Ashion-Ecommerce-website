import { useFormik } from "formik";
import login from "../../assets/login.jpg";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { authContext } from "../../Context/AuthContext";
import { useDispatch } from "react-redux";
import { getUserCartProduct } from "../../Redux/cartSlice";
function Login() {
  let dispatch = useDispatch();
  const [errormessage, setErrorMessage] = useState("");
  const [isLoading, setLoadingStae] = useState(false);
  const { setLoginState } = useContext(authContext);
  const navigate = useNavigate();
  const loginSchema = Yup.object({
    email: Yup.string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter vaild  Email Please")
      .required("Email is Required"),
    password: Yup.string()
      .matches(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "password must contain at least eight characters at least one number both lower and uppercase letters at least one special characters, #, ?, !."
      )
      .required("password is Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: () => {
      setLoadingStae(true);
      setErrorMessage("");
      axios
        .post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          formik.values
        )
        .then((res) => {
          localStorage.setItem("userData", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);
          dispatch(getUserCartProduct());
          setLoginState(true);
          setLoadingStae(false);

          if (location.pathname == "/login") {
            navigate("/")
          } else {
            navigate(location.pathname);
          }
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
          setLoadingStae(false);
        });
    },
  });

  return (
    <>
      <div className="container md:my-10 my-3 p-5 mx-auto  flex flex-col md:flex-row items-center gap-2">
        <div className="hidden md:block">
          <img src={login} alt="login-imge" />
        </div>
        <div className=" md:w-1/2 w-full  flex justify-center p-10">
          <form className="mx-auto w-full " onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                placeholder="name@email.com"
                onChange={formik.handleChange}
                value={formik.values.email}
                disabled={isLoading}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-xs  text-red-700">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                disabled={isLoading}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-xs text-red-700">
                  {formik.errors.password}
                </div>
              ) : null}
              {errormessage && (
                <div className="text-s  text-red-700 text-center p-3">
                  {errormessage}
                </div>
              )}
            </div>
            <div className=" items-start mb-3 text-sm">
              <p>
                Don’t have An Account?{" "}
                <Link className="underline" to={"/signup"}>
                  Signup
                </Link>
              </p>
              <a className="text-red-700" href="#">
                Forget Password?
              </a>
            </div>
            <button
              type="submit"
              className={
                isLoading
                  ? "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-1/2   px-8 py-2.5 text-center"
                  : "bg-red-800 text-white font-medium rounded-lg text-sm w-full sm:w-1/2   px-8 py-2.5 text-center"
              }
              disabled={isLoading}
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <span> Login</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
