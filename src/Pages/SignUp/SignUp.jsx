import {
  faShieldHalved,
  faStar,
  faTruckFast,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import reviewImg from "../../assets/Images/review-author.png";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { sendDataToSignUp } from "../../services/auth.service";
import { checkPasswordStrength } from "../../utils/validation";

export default function SignUp() {
  const navigate = useNavigate();
  const [isExistError, setIsExistError] = useState(null);

  const phoneRegex = /^(\+2)?01[0125][0-9]{8}$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const schema = yup.object({
    name: yup.string().required("name is required"),
    email: yup.string().required("email is required").email("invalid email"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        passwordRegex,
        "password should be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
      ),
    rePassword: yup
      .string()
      .required("confirm password is required")
      .oneOf(
        [yup.ref("password")],
        "password and re-password should be the same",
      ),
    phone: yup
      .string()
      .required("phone number is required")
      .matches(phoneRegex, "we accept egyption phone numbers only"),
    terms: yup
      .boolean()
      .oneOf([true], "you must agree with our terms and policy"),
  });

  async function handleSignup(values) {
    try {
      const response = await sendDataToSignUp(values);

      if (response.success) {
        toast.success("Your account has been created");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setIsExistError(error.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    validationSchema: schema,
    onSubmit: handleSignup,
  });

  const passwordFeedback = checkPasswordStrength(formik.values.password);

  return (
    <>
      <main className="py-12">
        <div className="container grid gap-12 lg:grid-cols-2">
          {/* Left Side */}
          <div className="hidden space-y-8 py-7 lg:block">
            <div className="welcome-msg">
              <h2 className="text-4xl font-bold">
                Welcome to <span className="text-primary-600">FreshCart</span>
              </h2>
              <p className="text-md mt-2 font-medium">
                Join thousands of happy customers who enjoy fresh groceries
                delivered right to their doorstep
              </p>
            </div>

            <ul className="space-y-5 *:flex *:items-center *:gap-3">
              <li>
                <div className="icon bg-primary-300 text-primary-700 flex size-12 items-center justify-center rounded-full text-xl">
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className="content">
                  <h3 className="font-bold">Premium Quality</h3>
                  <p className="text-gray-600">
                    Premium quality products sourced from trusted suppliers
                  </p>
                </div>
              </li>

              <li>
                <div className="icon bg-primary-300 text-primary-700 flex size-12 items-center justify-center rounded-full text-xl">
                  <FontAwesomeIcon icon={faTruckFast} />
                </div>
                <div className="content">
                  <h3 className="font-bold">Fast Delivery</h3>
                  <p className="text-gray-600">
                    Same-day delivery available in most areas
                  </p>
                </div>
              </li>

              <li>
                <div className="icon bg-primary-300 text-primary-700 flex size-12 items-center justify-center rounded-full text-xl">
                  <FontAwesomeIcon icon={faShieldHalved} />
                </div>
                <div className="content">
                  <h3 className="font-bold">Secure Shopping</h3>
                  <p className="text-gray-600">
                    Your data and payments are completely secure
                  </p>
                </div>
              </li>
            </ul>

            <div className="review rounded-xl bg-white p-5 shadow-lg">
              <div className="flex items-center gap-3">
                <img
                  src={reviewImg}
                  className="size-12 rounded-full"
                  alt="Sarah Jonson Profile Img"
                />
                <div>
                  <h3>Sarah Jonson</h3>
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                </div>
              </div>
              <blockquote className="mt-3 text-gray-700 italic">
                <p>
                  "FreshCart has transformed my shopping experience. The quality
                  of the products is outstanding, and the delivery is always on
                  time. Highly recommend!"
                </p>
              </blockquote>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-8 rounded-xl px-3 py-7 shadow-xl sm:px-9">
            <div className="text-center">
              <h2 className="text-3xl font-semibold">Create Your Account</h2>
              <p className="pt-1">Start your fresh journey with us today</p>
            </div>

            <div className="flex gap-2 *:flex *:w-full *:items-center *:justify-center *:gap-2 *:hover:bg-gray-100">
              <button className="btn border border-gray-400/40 bg-transparent">
                <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
                <span>Google</span>
              </button>
              <button className="btn border border-gray-400/40 bg-transparent">
                <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
                <span>Facebook</span>
              </button>
            </div>

            <div className="relative h-0.5 w-full bg-gray-300/30">
              <span className="absolute top-1/2 left-1/2 -translate-1/2 bg-white px-4">
                or
              </span>
            </div>

            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div className="name flex flex-col gap-1">
                <label htmlFor="name">Name*</label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  placeholder="Ali"
                  value={formik.values.name}
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-600">*{formik.errors.name}</p>
                )}
              </div>

              <div className="email flex flex-col gap-1">
                <label htmlFor="email">Email*</label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="ali@gmail.com"
                  value={formik.values.email}
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-600">*{formik.errors.email}</p>
                )}
                {isExistError && (
                  <p className="text-red-500">*{isExistError}</p>
                )}
              </div>

              <div className="password flex flex-col gap-1">
                <label htmlFor="password">Password*</label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  placeholder="Create a strong password"
                  value={formik.values.password}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.values.password && (
                  <div className="password-strength flex items-center gap-2">
                    <div className="bar h-1 w-full overflow-hidden rounded-xl bg-gray-200">
                      <div
                        className={`progress h-full ${passwordFeedback.background} ${passwordFeedback.width} `}
                      ></div>
                    </div>
                    <span className="text-sm text-nowrap">
                      {passwordFeedback.text}
                    </span>
                  </div>
                )}

                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-600">*{formik.errors.password}</p>
                ) : (
                  <p className="text-sm">
                    Must be at least 8 characters with numbers and symbols
                  </p>
                )}
              </div>

              <div className="rePassword flex flex-col gap-1">
                <label htmlFor="rePassword">Confirm Password*</label>
                <input
                  className="form-control"
                  type="password"
                  id="rePassword"
                  placeholder="Confirm your password"
                  value={formik.values.rePassword}
                  name="rePassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.rePassword && formik.errors.rePassword && (
                  <p className="text-red-600">*{formik.errors.rePassword}</p>
                )}
              </div>

              <div className="phone flex flex-col gap-1">
                <label htmlFor="phone">Phone*</label>
                <input
                  className="form-control"
                  type="tel"
                  id="phone"
                  placeholder="+20 10 9751 4862 "
                  value={formik.values.phone}
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-600">*{formik.errors.phone}</p>
                )}
              </div>

              <div className="terms">
                <div className="flex items-center gap-2">
                  <input
                    className="accent-primary-600 size-4"
                    type="checkbox"
                    id="terms"
                    value={formik.values.terms}
                    name="terms"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="terms">
                    I agree to the{" "}
                    <Link to={"/terms"} className="text-primary-500 underline">
                      Terms Of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      className="text-primary-500 underline"
                      to={"/privacy-policy"}
                    >
                      Privacy Policy
                    </Link>{" "}
                    *
                  </label>
                </div>
                {formik.touched.terms && formik.errors.terms && (
                  <p className="mt-2 text-red-600">*{formik.errors.terms}</p>
                )}
              </div>

              <button
                type="submit"
                className="btn bg-primary-600 hover:bg-primary-700 flex w-full items-center justify-center gap-2 text-white"
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Create My Account</span>
              </button>
            </form>

            <p className="border-t border-gray-400/40 pt-5 text-center">
              Already have an account?{" "}
              <Link className="text-primary-600 underline" to={"/login"}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
