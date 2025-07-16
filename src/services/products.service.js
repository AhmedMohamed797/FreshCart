import { apiClient } from "./api.client";

export async function getAllProducts({
  page,
  keyword,
  priceGreaterThan,
  priceLessThan,
  sortedBy,
  category,
  brand,
} = {}) {
  const options = {
    url: `/products?${page ? `page=${page}` : ""}${
      keyword ? `&keywork=${keyword}` : ""
    }${priceGreaterThan ? `&price[gte]=${priceGreaterThan}` : ""}${
      priceLessThan ? `&price[lte]=${priceLessThan}` : ""
    }${sortedBy ? `&sort=${sortedBy}` : ""}${
      category ? `&category[in]=${category}` : ""
    }${brand ? `&brand=${brand}` : ""}`,
    method: "GET",
  };

  const response = await apiClient(options);
  return response;
}

export async function getProductById({ id }) {
  const options = {
    url: `/products/${id}`,
    method: "GET",
  };

  const response = await apiClient.request(options);
  return response;
}
