import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchDataBeritaTerbaru } from "@/apis/fetchdata"; 
import {
  initDB,
  saveDataToIndexedDB,
  getDataFromIndexedDB,
} from "@/utils/indexedDB"; // Mengimpor fungsi dari indexedDB

const HeroSection = () => {
  const [terbaru, setTerbaru] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const fetchBeritaWithCache = async () => {
      try {
        const db = await initDB();
        const cachedData = await getDataFromIndexedDB(); // Mengambil semua data dari IndexedDB
        console.log("Cached Data:", cachedData); // Cek data dari IndexedDB

        // Cek apakah ada cached data
        if (cachedData.length > 0) {
          setTerbaru(cachedData); // Set data dari cache jika ada
        }

        const res = await fetchDataBeritaTerbaru(); // Ambil data terbaru dari API
        console.log("Response from API:", res); // Cek respon dari API

        // Jika API berhasil dan data valid
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          // Update atau tambahkan data ke IndexedDB
          await saveDataToIndexedDB(res.data); // Simpan data baru ke IndexedDB

          // Set data state dengan data terbaru
          setTerbaru(res.data);
        }
      } catch (error) {
        console.error("Error fetching or caching data:", error);
      }
    };

    fetchBeritaWithCache();
  }, []); // Kosongkan dependensi untuk fetch sekali saat mount

  return (
    <section className="hero pb-10">
      <div className="th-hero-wrapper hero-1" id="hero">
        <div className="th-hero-slide">
          <div className="th-hero-bg">
            {terbaru.length > 0 ? (
              <Image
                style={{
                  filter: "brightness(0.7)",
                  height: "850px",
                  width: "100%",
                  objectFit: "cover",
                  // Tambahkan media query untuk mobile dalam JavaScript:
                  ...(typeof window !== "undefined" && window.innerWidth <= 768
                    ? { height: "600px" }
                    : {}),
                }}
                src={terbaru[activeIndex]?.thumbnail || "/images/logo/fav.svg"}
                alt={terbaru[activeIndex]?.title || "Default Image"}
                width={1920}
                height={550}
              />
            ) : (
              <p>No data available</p>
            )}
          </div>
          <div className="container-q">
            <div
              className="blog-bg-style1"
              style={{
                maxWidth: "65%",
                paddingBottom: "70px",
                paddingTop: "30px",
              }}
            >
              <span className="category">Berita Terbaru</span>
              <h3>
                <a
                  className="hover-line"
                  href="#"
                  style={{
                    fontSize: "30px", // Ganti ukuran teks
                  }} // Ganti warna teks
                >
                  {terbaru[activeIndex]?.title || "Default Title"}
                </a>
              </h3>
              <div className="blog-meta mt-15">
                <span>
                  <i className="fa fa-calendar me-2" />
                  {terbaru[activeIndex]?.published_at_v2 || "Default Date"}
                </span>
                <span>
                  <i className="fa fa-eye me-2" />
                  {terbaru[activeIndex]?.views || 0} views
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-tab-area">
          <div className="container">
            <div className="hero-tab">
              <div className="container-tab">
                {terbaru.map((item, index) => (
                  <div
                    key={item.id} // Gunakan item.id sebagai kunci
                    className={`tab-btn ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(index)}
                  >
                    <div className="tab-btn-item">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={150}
                        height={150}
                      />
                      <div className="tab-btn-content ms-3">
                        <h6>{item.title}</h6>
                        <div className="content-footer">
                          <span>
                            <i className="fa fa-calendar me-2" />
                            {item.published_at_v2}
                          </span>
                          <span>
                            <i className="fa fa-eye me-2" />
                            {item.views} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;