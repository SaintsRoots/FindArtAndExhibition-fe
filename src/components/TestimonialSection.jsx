import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import img1 from "../assets/paints.jpg";
const TestimonialSection = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className="bg-textColor1  min-h-screen flex flex-col gap-4 md:gap-14 items-start justify-center ">
      <div className="container mx-auto px-6 md:px-12 flex flex-col gap-4 justify-center items-center">
        <div className="flex items-center flex-col ">
          <h2 className="text-2xl font-bold uppercase ">Customer Testmonial</h2>
          <small className=" !text-center ">Our Lovely Customer</small>
        </div>
        <article className="w-full md:w-1/2 mx-auto p-2  ">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
          >
            <SwiperSlide className="flex bg-white mx-auto rounded-xl !p-4 flex-col gap-2 items-center justify-center">
              <div className="w-[70px] bg-textColor1 mx-auto text-center  !max-h-[33%] rounded-full p-1">
                <img src={img1} alt="" className=" rounded-full " />
              </div>
              <h3 className=" capitalize font-semibold ">john doe</h3>
              <p className="text-center text-black text-sm !px-2 ">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit
                quidem reprehenderit dolorum mollitia natus. Voluptas ipsum
                suscipit saepe ipsam ipsa.
              </p>
            </SwiperSlide>
            <SwiperSlide className="flex bg-white mx-auto rounded-xl !p-4 flex-col gap-2 items-center justify-center ">
              <div className="w-[70px] bg-textColor1 mx-auto text-center  !max-h-[33%] rounded-full p-1">
                <img src={img1} alt="" className=" rounded-full " />
              </div>
              <h3 className=" capitalize font-semibold ">john doe</h3>
              <p className="text-center text-black text-sm !px-2 ">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit
                quidem reprehenderit dolorum mollitia natus. Voluptas ipsum
                suscipit saepe ipsam ipsa.
              </p>
            </SwiperSlide>
            <SwiperSlide className="flex bg-white mx-auto rounded-xl !p-4 flex-col gap-2 items-center justify-center ">
              <div className="w-[70px] bg-textColor1 mx-auto text-center  !max-h-[33%] rounded-full p-1">
                <img src={img1} alt="" className=" rounded-full " />
              </div>
              <h3 className=" capitalize font-semibold ">john doe</h3>
              <p className="text-center text-black text-sm !px-2 ">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit
                quidem reprehenderit dolorum mollitia natus. Voluptas ipsum
                suscipit saepe ipsam ipsa.
              </p>
            </SwiperSlide>
            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </article>
      </div>
    </div>
  );
};

export default TestimonialSection;
