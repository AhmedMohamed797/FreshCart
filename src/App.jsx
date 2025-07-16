import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import NotFound from "./Pages/NotFound/NotFound";
import Wishlist from "./Pages/Wishlist/Wishlist";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import SearchProducts from "./Pages/SearchProducts/SearchProducts";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Orders from "./Pages/Orders/Orders";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetCode from "./Pages/ResetCode/ResetCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Checkout from "./Pages/Checkout/Checkout";
import Categories from "./Pages/Categories/Categories";
import Cart from "./Pages/Cart/Cart";
import Brands from "./Pages/Brands/Brands";
import Deals from "./Pages/Deals";
import { ToastContainer } from "react-toastify";
import ProductsProvider from "./Context/Products.context";
import CategoriesProvider from "./Context/Categories.context";
import AuthProvider from "./Context/Auth.context";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import CartProvider from "./Context/Cart.context";
import WishlistProvider from "./Context/Wishlist.context";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "verify-email",
          element: <VerifyEmail />,
        },
        {
          path: "search-products",
          element: <SearchProducts />,
        },
        {
          path: "products/:id",
          element: <ProductDetails />,
        },
        {
          path: "orders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "reset-code",
          element: <ResetCode />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: <Brands />,
        },
        {
          path: "deals",
          element: <Deals />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ProductsProvider>
              <CategoriesProvider>
                <RouterProvider router={router} />
                <ToastContainer
                  position="top-right"
                  closeButton={false}
                  closeOnClick={true}
                  autoClose={2000}
                />
              </CategoriesProvider>
            </ProductsProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
