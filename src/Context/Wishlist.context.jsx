import { createContext, useEffect, useState, useContext } from "react";
import {
  addProductToWishlist,
  getWishlistItems,
  removeWishlistItem,
} from "../services/wishlist.service";
import { toast } from "react-toastify";
import { AuthContext } from "./Auth.context";

const WishlistContext = createContext(null);

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

withReactContent(Swal);

export default function WishlistProvider({ children }) {
  const [wishlistInfo, setWishlistInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(AuthContext);

  async function handleAddProductToWishlist({ id }) {
    try {
      setIsLoading(true);
      const response = await addProductToWishlist({ id });
      if (response.success) {
        toast.success(response.data.message);
        setWishlistInfo(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function handleFetchWishlistItems() {
    try {
      setIsLoading(true);
      const response = await getWishlistItems();
      if (response.success) {
        setIsLoading(false);
        setWishlistInfo(response.data);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function handleRemoveWishlistItem({ id }) {
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
        const toastId = toast.loading("Deleting Wishlist Item");
        const response = await removeWishlistItem({ id });

        if (response.success) {
          setIsLoading(false);
          toast.dismiss(toastId);
          toast.success(response.data.message);
          setWishlistInfo((prev) => {
            if (!prev) return prev;
            const newData = prev.data.filter((item) => item.id !== id);
            return {
              ...prev,
              data: newData,
              count: newData.length,
            };
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      handleFetchWishlistItems();
    } else {
      setWishlistInfo(null);
      setIsLoading(false);
    }
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistInfo,
        isLoading,
        handleAddProductToWishlist,
        handleRemoveWishlistItem,
        refreshWishlist: handleFetchWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export { WishlistContext };
