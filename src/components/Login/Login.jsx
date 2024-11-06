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
  const [showPassword, setShowPassword] = useState(false);

  window.scrollTo(0, 0);
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
            navigate("/");
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
     
        <div className="hidden lg:block">
          <img src={login} alt="login-imge" />
        </div>
        <div className=" lg:w-1/2 md:w-3/4 mx-auto w-full  border shadow-md  ">
        <h2 className="p-5 text-gray-900 text-3xl uppercase">Login</h2>
          <form className="mx-auto w-full  p-10  " onSubmit={formik.handleSubmit}>
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
              <div className="flex items-center relative ">
                <input
                  type={showPassword ?"text":"password"}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  disabled={isLoading}
                  placeholder="Your password"
                />
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 absolute right-[4%] cursor-pointer"
                    onClick={()=>setShowPassword(!showPassword)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 absolute right-[4%] cursor-pointer"
                    onClick={()=>setShowPassword(!showPassword)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </div>

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
