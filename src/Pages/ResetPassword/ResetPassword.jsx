import {
  faClock,
  faEnvelope,
  faShieldHalved,
  faTruckFast,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loginImg from "../../assets/Images/login-img.png";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { resetPassword } from "../../services/auth.service";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get email and code from URL params
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const schema = yup.object({
    newPassword: yup
      .string()
      .required("New password is required")
      .matches(
        passwordRegex,
        "Password should be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
      ),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  });

  async function handleResetPassword(values) {
    setIsLoading(true);
    try {
      const response = await resetPassword({
        email: email,
        newPassword: values.newPassword,
      });

      if (response.success) {
        toast.success(
          "Password reset successfully! Please login with your new password.",
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(
        error.message || "Failed to reset password. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: handleResetPassword,
  });

  // Redirect if no email or code is provided
  if (!email || !code) {
    navigate("/forget-password");
    return null;
  }

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
                Reset Password
              </h3>
              <p className="text-gray-500">Enter your new password below</p>
              {email && (
                <p className="mt-2 text-sm text-gray-600">
                  Resetting password for:{" "}
                  <span className="font-semibold">{email}</span>
                </p>
              )}
            </div>

            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div className="newPassword flex flex-col gap-1">
                <label
                  htmlFor="newPassword"
                  className="font-bold text-gray-700"
                >
                  New Password
                </label>

                <div className="relative">
                  <input
                    className="form-control w-full ps-10 pe-10"
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    placeholder="Enter your new password"
                    value={formik.values.newPassword}
                    name="newPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                  />

                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-lg text-gray-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-lg text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>

                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    *{formik.errors.newPassword}
                  </p>
                )}
              </div>

              <div className="confirmPassword flex flex-col gap-1">
                <label
                  htmlFor="confirmPassword"
                  className="font-bold text-gray-700"
                >
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    className="form-control w-full ps-10 pe-10"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm your new password"
                    value={formik.values.confirmPassword}
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                  />

                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-lg text-gray-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-lg text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>

                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      *{formik.errors.confirmPassword}
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
                    <span>Resetting...</span>
                  </>
                ) : (
                  <span>Reset Password</span>
                )}
              </button>
            </form>

            <div className="space-y-4">
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
        </div>
      </main>
    </>
  );
}
