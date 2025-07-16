import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../Context/Products.context";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loading from "../../Components/Loading/Loading";
import { calcLeftTime } from "../../utils/counter-down";

export default function Deals() {
  const { Products, isLoading } = useContext(ProductsContext);
  const [leftTime, setLeftTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calcLeftTime();
      setLeftTime(newTimeLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const deals = Products.filter((product) => product.priceAfterDiscount);

  return (
    <section>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
          <div>
            <h2 className="mb-2 text-2xl font-bold">All Deals</h2>
            <div className="flex items-center gap-4">
              <p>Offers end in: </p>
              <div className="counter flex items-center gap-2 *:flex *:items-center *:justify-center">
                <div className="size-7 rounded-md bg-gray-900 text-sm text-white">
                  {String(leftTime.hours).padStart(2, "0")}
                </div>
                <span>:</span>
                <div className="size-7 rounded-md bg-gray-900 text-sm text-white">
                  {String(leftTime.minutes).padStart(2, "0")}
                </div>
                <span>:</span>
                <div className="size-7 rounded-md bg-gray-900 text-sm text-white">
                  {String(leftTime.seconds).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-5 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {deals.length === 0 ? (
            <div className="col-span-full text-center text-lg text-gray-500">
              No deals available right now.
            </div>
          ) : (
            deals.map((product) => (
              <ProductCard key={product.id} productInfo={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
