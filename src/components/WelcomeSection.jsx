import { Swiper, SwiperSlide } from "swiper/react";
import bg1 from "../assets/bg-2.jpg";
import bg2 from "../assets/bg-1.jpg";
import bg3 from "../assets/bg-3.jpg";
import bg4 from "../assets/bg-4.jpg";
import bg5 from "../assets/bg-5.jpg";
import arch from "../assets/arch.jpg";
import backg from "../assets/backg.jpg";
import draw from "../assets/draw.jfif";
import paint from "../assets/paints.jpg";
import scl1 from "../assets/scl1.jfif";
import slide from "../assets/slide1.jpg";
import wart from "../assets/wart.jpg";
import "../welcome.css"
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { getCurrentYear } from "../utils/CurrentYear";
import Button from "./form/Button";
const WelcomeSection = () => {
  return (
    <div className="min-h-screen bg flex flex-col  items-center justify-center  gap-2">
      <div className="container mx-auto px-6 md:px-14 ">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide className="relative ">
            <img src={bg5} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">
                  Wall Decoloration
                </h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <img src={bg2} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">Photography</h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <img src={bg3} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">Painting</h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <img src={bg4} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">Sculpture</h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <img src={backg} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">Ceramic</h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <img src={arch} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">Architecture</h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <img src={wart} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">
                  Wall Decoloration
                </h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <img src={slide} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">Photography</h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <img src={paint} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">Painting</h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <img src={scl1} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">Sculpture</h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <img src={draw} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">Ceramic</h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <img src={arch} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">Architecture</h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <img src={bg5} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">Wall Gallery</h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <img src={bg1} alt="" />
            <div className="absolute text-white top-0 left-0 w-full h-full bg-black bg-opacity-60  p-4 flex flex-col gap-1 justify-between">
              <div></div>
              <div className="flex flex-col items-end gap-1 ">
                <h3 className=" capitalize font-semibold text-sm ">
                  imigongo art collection {getCurrentYear()}{" "}
                </h3>
                <h1 className="uppercase text-xl font-bold ">Drawing</h1>
                <p className="text-xs text-right ">
                  "Art enables us to find ourselves and lose ourselves at the
                  same time." – Thomas Merton
                </p>
                <Button
                  title="Check Now"
                  path={"/shop"}
                  styles={`!border-secondary text-secondary`}
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default WelcomeSection;
