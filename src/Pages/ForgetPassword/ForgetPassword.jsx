import {
  faClock,
  faEnvelope,
  faShieldHalved,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loginImg from "../../assets/Images/login-img.png";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { sendForgotPasswordRequest } from "../../services/auth.service";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object({
    email: yup.string().required("email is required").email("invalid email"),
  });

  async function handleForgotPassword(values) {
    setIsLoading(true);
    try {
      const response = await sendForgotPasswordRequest(values);

      if (response.success) {
        toast.success("Reset link sent to your email successfully!");
        setTimeout(() => {
          navigate(`/reset-code?email=${encodeURIComponent(values.email)}`);
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: handleForgotPassword,
  });

  return (
    <>
      <main className="min-h-screen py-12">
        <div className="container grid items-center lg:grid-cols-2 xl:px-20">
          {/* Left Side */}
          <div className="mx-auto hidden w-10/12 space-y-7 rounded-3xl lg:block">
            <div className="h-[320px] overflow-hidden rounded-2xl shadow-xl">
              <img
                src={loginImg}
                className="h-full w-full scale-105 object-cover object-center"
                alt="Login Img"
              />
            </div>

            <h2 className="text-center text-2xl font-bold">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h2>

            <p className="text-center text-gray-600">
              Join thousands of happy customers who trust FreshCart for their
              daily grocery needs
            </p>

            <ul className="text-primary-700 flex justify-center gap-7 text-sm *:flex *:items-center *:gap-2">
              <li>
                <FontAwesomeIcon icon={faTruckFast} />
                <span>Free Delivery</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faShieldHalved} />
                <span>Secure Payment</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faClock} />
                <span>24/7 Support</span>
              </li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="space-y-8 rounded-2xl bg-white/90 px-4 py-10 shadow-xl sm:px-10">
            <div className="space-y-1 text-center">
              <h2 className="text-3xl font-extrabold">
                <span className="text-primary-600">Fresh</span>Cart
              </h2>
              <h3 className="text-2xl font-semibold text-gray-700">
                Forgot Password?
              </h3>
              <p className="text-gray-500">
                Enter your email address and we'll send you a link to reset your
                password
              </p>
            </div>

            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div className="email flex flex-col gap-1">
                <label htmlFor="email" className="font-bold text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <input
                    className="form-control w-full ps-10"
                    type="email"
                    id="email"
                    placeholder="Enter Your Email"
                    value={formik.values.email}
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                  />

                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-lg text-gray-400"
                  />
                </div>

                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    *{formik.errors.email}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn bg-primary-600 hover:bg-primary-700 flex w-full items-center justify-center gap-2 text-lg text-white shadow-md disabled:bg-gray-400"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Reset Link</span>
                )}
              </button>
            </form>

            <p className="border-t border-gray-200 pt-5 text-center text-gray-600">
              Remember your password?
              <Link
                className="text-primary-600 ml-2 font-semibold underline"
                to={"/login"}
              >
                Back to Login
              </Link>
            </p>

            <p className="text-center text-gray-600">
              Don't have an account?
              <Link
                className="text-primary-600 ml-2 font-semibold underline"
                to={"/signup"}
              >
                Create An Account
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
