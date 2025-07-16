import { apiClient } from "./api.client";

export async function getAllCategories() {
  const options = {
    url: `/categories`,
    method: "GET",
  };

  const response = await apiClient.request(options);
  return response;
}
