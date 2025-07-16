import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import ProductCard from "../ProductCard/ProductCard";
import { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { calcLeftTime } from "./../../utils/counter-down";
import { ProductsContext } from "../../Context/Products.context";

export default function HomeDeals() {
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

    return function () {
      clearInterval(timer);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const deals = Products
    .filter((product) => product.priceAfterDiscount)
    .slice(5, 10);

  return (
    <>
      <section>
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
            <div>
              <h2 className="mb-2 text-2xl font-bold">Deals of the Day</h2>
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
            <div className="text-primary-600 hover:text-primary-700 space-x-3 transition-colors duration-200">
              <Link to={"/deals"} className="">
                View All Deals
              </Link>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
          <div className="grid gap-5 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {deals.map((product) => (
              <ProductCard key={product.id} productInfo={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
