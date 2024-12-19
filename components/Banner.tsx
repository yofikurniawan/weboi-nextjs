import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchDataBanner } from "@/apis/fetchdata";
import {
  saveDataToIndexedDB,
  getDataFromIndexedDB,
} from "@/utils/IndexedDBBanner"; // Import utility

const Banner = () => {
  const [banner, setBanner] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchDataBanner();
        if (res.data && res.data.length > 0) {
          setBanner(res.data);
          await saveDataToIndexedDB("bannerData", res.data); // Save to IndexedDB
        } else {
          setErrorMessage("Data Akuntabilitas Tidak Ditemukan ...");
        }
      } catch (err) {
        console.error(err); // Log error for debugging
        // Try to fetch from IndexedDB if API fails
        const bannersFromDB = await getDataFromIndexedDB("bannerData");
        if (bannersFromDB && bannersFromDB.data) {
          setBanner(bannersFromDB.data);
        } else {
          setErrorMessage("Failed to fetch data and no data in cache.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Pengaturan Slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    centerPadding: "80px", // Untuk layar besar
    responsive: [
      {
        breakpoint: 768, // Untuk perangkat mobile
        settings: {
          centerPadding: "0px", // Menghapus padding di mobile
        },
      },
    ],
  };

  return (
    <section className="testimonial bg_img pt-210 pb-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="xb-slider">
              <Slider {...settings}>
                {loading ? (
                  <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "0 -20px",
                      }}
                    >
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} style={{ margin: "0 20px" }}>
                          <Skeleton height={400} width={1500} />
                        </div>
                      ))}
                    </div>
                  </SkeletonTheme>
                ) : errorMessage ? (
                  <div>{errorMessage}</div>
                ) : (
                  banner.map((item, index) => (
                    <div key={index}>
                      <a
                        onClick={(e) => e.preventDefault()}
                        href="#"
                        className="xb-item--img large-image"
                        style={{
                          display: "block",
                          overflow: "hidden",
                          borderRadius: "10px",
                          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                          margin: "0 20px",
                        }}
                      >
                        <Image
                          src={item.foto}
                          alt=""
                          width={1500} // Ukuran gambar asli
                          height={400} // Ukuran gambar asli
                          layout="responsive" // Membuat gambar responsif
                          style={{
                            borderRadius: "10px",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </a>
                    </div>
                  ))
                )}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
