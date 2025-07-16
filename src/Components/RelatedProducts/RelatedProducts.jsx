import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products.service";
import Loading from "../Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";

export default function RelatedProducts({ productDetails }) {
  const { category } = productDetails;

  const [relatedProducts, setRelatedProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchRelatedProducts() {
    try {
      const response = await getAllProducts({ category: category._id });

      if (response.success) {
        setIsLoading(false);
        setRelatedProducts(response.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRelatedProducts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="mb-4 text-2xl font-bold">You May Also Like</h2>
            <div className="flex items-center gap-2">
              <button className="related-prev-btn hover:text-primary-600 text-gray-400 transition-colors duration-200">
                <FontAwesomeIcon
                  icon={faChevronCircleLeft}
                  className="text-3xl"
                />
              </button>
              <button className="related-next-btn hover:text-primary-600 text-gray-400 transition-colors duration-200">
                <FontAwesomeIcon
                  icon={faChevronCircleRight}
                  className="text-3xl"
                />
              </button>
            </div>
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".related-next-btn",
              prevEl: ".related-prev-btn",
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 10 },
              1024: { slidesPerView: 4, spaceBetween: 10 },
              1280: { slidesPerView: 5, spaceBetween: 10 },
            }}
          >
            {relatedProducts.map((product) => (
              <SwiperSlide key={product.id} className="py-4">
                <ProductCard productInfo={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
