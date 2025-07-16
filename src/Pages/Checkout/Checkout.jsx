import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";
import { AuthContext } from "../../Context/Auth.context";
import { toast } from "react-toastify";

export default function Checkout() {
  const { cartInfo, refreshCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  async function payCash(values, { resetForm, setSubmitting }) {
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: token,
          },
        },
      )
      .then((response) => {
        if (response.data.status === "success") {
          refreshCart();
          toast.success(
            "Order placed successfully! Your cart has been cleared.",
          );
          resetForm();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setSubmitting(false));
  }

  async function payOnline(values, { setSubmitting }) {
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=http://localhost:5173`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: token,
          },
        },
      )
      .then((response) => {
        if (
          response.data.status === "success" &&
          response.data.session &&
          response.data.session.url
        ) {
          toast.success("Redirecting to online payment...");
          window.location.href = response.data.session.url;
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setSubmitting(false));
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: payCash,
  });

  // Handler for Pay Online button
  const handlePayOnline = (e) => {
    e.preventDefault();
    formik.setSubmitting(true);
    payOnline(formik.values, { setSubmitting: formik.setSubmitting });
  };

  return (
    <main className="py-12">
      <div className="container mx-auto max-w-lg rounded-xl bg-white p-8 shadow-xl">
        <h2 className="mb-8 text-center text-3xl font-semibold">Checkout</h2>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="details" className="font-medium">
              Details
            </label>
            <input
              className="form-control"
              type="text"
              id="details"
              name="details"
              placeholder="Address details, e.g. Apartment, Floor, etc."
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="font-medium">
              Phone
            </label>
            <input
              className="form-control"
              type="tel"
              id="phone"
              name="phone"
              placeholder="e.g. +20 10 1234 5678"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="city" className="font-medium">
              City
            </label>
            <input
              className="form-control"
              type="text"
              id="city"
              name="city"
              placeholder="e.g. Cairo"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="btn bg-primary-600 hover:bg-primary-700 w-full rounded-lg py-2.5 font-semibold text-white shadow-md transition-all"
              disabled={formik.isSubmitting}
            >
              Place Order
            </button>
            <button
              type="button"
              className="btn w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white shadow-md transition-all hover:bg-blue-700"
              onClick={handlePayOnline}
              disabled={formik.isSubmitting}
            >
              Pay Online
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
