import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Banner1 from "../../../assets/banner_1.png";

import "swiper/css";
import "swiper/css/pagination";

import "../../../styles/components/pages/homepage/Banners.scss";

const Banners = () => {
    return (
        <div className="banners">
            <Swiper
                style={
                    {
                        "--swiper-pagination-color": "var(--black)",
                        "--swiper-pagination-bottom": "-32px",
                    } as React.CSSProperties
                }
                modules={[Pagination]}
                loop={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                <SwiperSlide>
                    <img src={Banner1} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Banner1} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Banner1} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banners;
