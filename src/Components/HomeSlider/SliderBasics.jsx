import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function SliderBasics() {
  return (
    <>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={3}
        loop={true}
        spaceBetween={5}
        pagination
        navigation
        autoplay={{ delay: 5000 }}
      >
        <SwiperSlide>
          <div className="bg-primary-400 border-primary-600 flex h-80 w-full items-center justify-center border-5 text-2xl font-bold text-white">
            Slide 1
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-primary-400 border-primary-600 flex h-80 w-full items-center justify-center border-5 text-2xl font-bold text-white">
            Slide 2
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-primary-400 border-primary-600 flex h-80 w-full items-center justify-center border-5 text-2xl font-bold text-white">
            Slide 3
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-primary-400 border-primary-600 flex h-80 w-full items-center justify-center border-5 text-2xl font-bold text-white">
            Slide 4
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
