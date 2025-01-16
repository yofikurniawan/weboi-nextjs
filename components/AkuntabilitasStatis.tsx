import { useRef, useState, useEffect } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";
import ErrorHandler from "./ErrorHandler";
import { fetchDataCategoryAkuntabilitas } from "@/apis/fetchdata";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AkuntabilitasStatis() {
  const [category, setCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Indikator loading
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message
  const swiperRef = useRef<SwiperType | null>(null); // Swiper reference

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchDataCategoryAkuntabilitas();
        if (res.data && res.data.length > 0) {
          setCategory(res.data);
        } else {
          setErrorMessage("Data Akuntabilitas Tidak Ditemukan...");
        }
      } catch (err) {
        setErrorMessage("Failed to fetch data.");
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);

  // Set swiper reference using onSwiper
  const onSwiper = (swiper: any) => {
    swiperRef.current = swiper; // Set swiper reference
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev(); // Go to previous slide
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(); // Go to next slide
    }
  };

  return (
    <section className="testimonial bg_img pt-55 pb-30">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4">
            <div className="sec-title margin-none-md mb-30-xs ">
              <h2 className="mb-70 wow skewIn">
                Akuntabilitas <br />
                <span>Pemerintah Daerah</span>
              </h2>
              <div
                className="btns pt-20 wow fadeInUp"
                data-wow-delay="600ms"
                data-wow-duration=".6s"
              >
                <Link href="/akuntabilitas" className="thm-btn">
                  Lihat Semua
                </Link>
              </div>
              <div className="xb-testimonial__nav ul_li mt-5">
                <button
                  onClick={handlePrev}
                  className="tm-nav-item tm-button-prev"
                >
                  {/* Add your left arrow icon or text here */}
                </button>
                <button
                  onClick={handleNext}
                  className="tm-nav-item tm-button-next"
                >
                  {/* Add your right arrow icon or text here */}
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="xb-swiper-sliders">
              {loading ? (
                <Swiper
                  onSwiper={onSwiper}
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={3} // Show 2 slides
                  pagination={false} // Set pagination to false
                  navigation={{
                    nextEl: ".tm-button-next",
                    prevEl: ".tm-button-prev",
                  }}
                >
                  {/* Display skeleton loaders when loading */}
                  {[...Array(2)].map((_, index) => (
                    <SwiperSlide key={index}>
                      <div className="xb-destination">
                        <Skeleton height={600} width={800} />
                        <div className="xb-item--holder">
                          <Skeleton width="30%" />
                          <Skeleton width="30%" />
                          <Skeleton width="40%" />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : errorMessage ? (
                <ErrorHandler errorMessage={errorMessage} />
              ) : (
                <Swiper
                  onSwiper={onSwiper}
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={3} // Show 2 slides
                  pagination={false} // Set pagination to false
                  navigation={{
                    nextEl: ".tm-button-next",
                    prevEl: ".tm-button-prev",
                  }}
                >
                  {category.map((item: any) => (
                    <SwiperSlide key={item.id}>
                      <div className="xb-destination">
                        <a
                          href="#"
                          className="xb-item--img"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Image
                            src={item.foto}
                            alt=""
                            width={800}
                            height={500}
                            style={{
                              borderRadius: "20px",
                              objectFit: "cover",
                              border: "1px solidrgb(95, 65, 65)",
                            }}
                          />
                          <div className="xb-item--holder">
                            <h3 className="xb-item--title">{item.name}</h3>
                            <span>{item.alias}</span>
                          </div>
                        </a>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
