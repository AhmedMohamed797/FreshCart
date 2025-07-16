import { createContext, useEffect, useState } from "react";
import { getAllCategories } from "../services/category.service";

// eslint-disable-next-line react-refresh/only-export-components
export const CategoriesContext = createContext(null);

export default function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchAllCategories() {
    try {
      const response = await getAllCategories();

      if (response.success) {
        setIsLoading(false);
        setCategories(response.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, isLoading }}>
      {children}
    </CategoriesContext.Provider>
  );
}
