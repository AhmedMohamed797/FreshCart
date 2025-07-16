import { Swiper, SwiperSlide } from "swiper/react";
import homeSlide1 from "../../assets/Images/home-slider-1.png";
import homeSlide2 from "../../assets/Images/home-slider-2.png";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function HomeSlider() {
  return (
    <>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 5000 }}
      >
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${homeSlide1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay from-primary-600/95 to-primary-600/45 bg-gradient-to-r py-25 text-white">
              <div className="container space-y-4">
                <h2 className="text-2xl font-bold">
                  Fresh Products Delievered <br /> To Your Door
                </h2>

                <p>Get 20% Off for your first order</p>

                <div className="space-x-3">
                  <button className="btn text-primary-600 border-2 border-white bg-white hover:bg-gray-100">
                    Shop Now
                  </button>
                  <button className="btn hover:text-primary-600 border-2 border-white bg-transparent text-white hover:bg-white">
                    View Deals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${homeSlide2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay from-primary-600/95 to-primary-600/45 bg-gradient-to-r py-25 text-white">
              <div className="container space-y-4">
                <h2 className="text-2xl font-bold">
                  Fresh Products Delievered <br /> To Your Door
                </h2>

                <p>Get 20% Off for your first order</p>

                <div className="space-x-3">
                  <button className="btn text-primary-600 border-2 border-white bg-white hover:bg-gray-100">
                    Shop Now
                  </button>
                  <button className="btn hover:text-primary-600 border-2 border-white bg-transparent text-white hover:bg-white">
                    View Deals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
