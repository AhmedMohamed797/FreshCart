import { apiClient } from "./api.client";

export async function addProductToWishlist({ id }) {
  const options = {
    url: "/wishlist",
    method: "POST",
    data: {
      productId: id,
    },
  };

  const response = await apiClient.request(options);
  return response;
}

export async function getWishlistItems() {
  const options = {
    url: "/wishlist",
    method: "GET",
  };

  const response = await apiClient.request(options);
  return response;
}

export async function removeWishlistItem({ id }) {
  const options = {
    url: `/wishlist/${id}`,
    method: "DELETE",
  };

  const response = await apiClient.request(options);
  return response;
}
