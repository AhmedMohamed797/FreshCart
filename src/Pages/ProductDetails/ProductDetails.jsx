import ProductInfo from "./../../Components/ProductInfo/ProductInfo";
import RelatedProducts from "./../../Components/RelatedProducts/RelatedProducts";
import { useEffect, useState } from "react";
import { getProductById } from "../../services/products.service";
import { useParams } from "react-router";
import Loading from "./../../Components/Loading/Loading";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  async function fetchProductDetails() {
    try {
      setIsLoading(true);
      const response = await getProductById({ id });

      if (response.success) {
        setIsLoading(false);
        setProductDetails(response.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ProductInfo productDetails={productDetails} />
      <RelatedProducts productDetails={productDetails} />
    </>
  );
}
