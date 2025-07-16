import { createContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/products.service";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductsContext = createContext(null);

export default function ProductsProvider({ children }) {
  const [Products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const response = await getAllProducts();

      if (response.success) {
        setIsLoading(false);
        setProducts(response.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ Products, isLoading }}>
      {children}
    </ProductsContext.Provider>
  );
}
