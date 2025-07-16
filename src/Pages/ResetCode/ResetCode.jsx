import {
  faClock,
  faEnvelope,
  faShieldHalved,
  faTruckFast,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loginImg from "../../assets/Images/login-img.png";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { verifyResetCode } from "../../services/auth.service";

export default function ResetCode() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Get email from URL params if available
  const email = searchParams.get("email");

  const schema = yup.object({
    resetCode: yup
      .string()
      .required("Reset code is required")
      .matches(/^\d{6}$/, "Reset code must be exactly 6 digits"),
  });

  async function handleVerifyCode(values) {
    setIsLoading(true);
    try {
      const response = await verifyResetCode(values);

      if (response.success) {
        toast.success("Code verified successfully!");
        // Navigate to reset password page with the verified code
        setTimeout(() => {
          navigate(
            `/reset-password?code=${values.resetCode}${email ? `&email=${email}` : ""}`,
          );
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message || "Invalid reset code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: schema,
    onSubmit: handleVerifyCode,
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
                Verify Reset Code
              </h3>
              <p className="text-gray-500">
                Enter the 6-digit code sent to your email address
              </p>
              {email && (
                <p className="mt-2 text-sm text-gray-600">
                  Code sent to: <span className="font-semibold">{email}</span>
                </p>
              )}
            </div>

            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div className="resetCode flex flex-col gap-1">
                <label htmlFor="resetCode" className="font-bold text-gray-700">
                  Reset Code
                </label>

                <div className="relative">
                  <input
                    className="form-control w-full ps-10 text-center text-lg tracking-widest"
                    type="text"
                    id="resetCode"
                    placeholder="Enter 6-digit code"
                    value={formik.values.resetCode}
                    name="resetCode"
                    onChange={(e) => {
                      // Only allow numbers and limit to 6 digits
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      formik.setFieldValue("resetCode", value);
                    }}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                    maxLength={6}
                  />

                  <FontAwesomeIcon
                    icon={faKey}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-lg text-gray-400"
                  />
                </div>

                {formik.touched.resetCode && formik.errors.resetCode && (
                  <p className="mt-1 text-sm text-red-600">
                    *{formik.errors.resetCode}
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
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Verify Code</span>
                )}
              </button>
            </form>

            <div className="space-y-4">
              <p className="text-center text-sm text-gray-600">
                Didn't receive the code?
                <button
                  className="text-primary-600 hover:text-primary-700 ml-1 font-semibold underline"
                  onClick={() => navigate("/forget-password")}
                >
                  Resend Code
                </button>
              </p>

              <p className="border-t border-gray-200 pt-5 text-center text-gray-600">
                Remember your password?
                <Link
                  className="text-primary-600 ml-2 font-semibold underline"
                  to={"/login"}
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
