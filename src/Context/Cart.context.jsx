import { createContext, useEffect, useState, useContext } from "react";
import {
  addProductToCart,
  getCartItems,
  removeCartItem,
  updateProductQuantity,
} from "../services/cart.service";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

withReactContent(Swal);

import { AuthContext } from "./Auth.context";

export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(AuthContext);

  // * Add Product to cart
  async function handleAddingProductToCart({ id }) {
    try {
      setIsLoading(true);
      const response = await addProductToCart({ id });

      if (response.success) {
        setIsLoading(false);
        toast.success(response.data.message);
        setCartInfo(response.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  // & Get Cart Products
  async function handleFetchCartItems() {
    try {
      const response = await getCartItems();

      if (response.success) {
        setIsLoading(false);
        setCartInfo(response.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  // ^ Remove item form cart
  async function handleRemoveFromCart({ id }) {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        iconColor: "#d33",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting Cart Item");
        const response = await removeCartItem({ id });

        if (response.success) {
          toast.dismiss(toastId);
          toast.success("Item Deleted Successfully");
          setCartInfo(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // ? Update item Quantity
  async function handleUpdateQuantity({ id, count }) {
    try {
      const qu = toast.loading("Updating Product Qunatity");
      const response = await updateProductQuantity({ id, count });

      if (response.success) {
        toast.dismiss(qu);
        setCartInfo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      handleFetchCartItems();
    } else {
      setCartInfo(null);
      setIsLoading(false);
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cartInfo,
        isLoading,
        handleAddingProductToCart,
        handleRemoveFromCart,
        handleUpdateQuantity,
        refreshCart: handleFetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
