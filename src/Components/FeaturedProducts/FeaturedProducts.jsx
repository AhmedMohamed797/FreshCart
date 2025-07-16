import { useContext } from "react";
import Loading from "../Loading/Loading";
import ProductCard from "./../ProductCard/ProductCard";
import { ProductsContext } from "../../Context/Products.context";

export default function FeaturedProducts() {
  const { Products, isLoading } = useContext(ProductsContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="py-10">
        <div className="container">
          <h2 className="mb-5 text-2xl font-bold">Featured Products</h2>
          <div className="grid gap-5 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Products.map((product) => (
              <ProductCard key={product.id} productInfo={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
