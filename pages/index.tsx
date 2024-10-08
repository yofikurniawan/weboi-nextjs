import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import MediaSosial from "../components/MediaSosial";
import Akuntabilitas from "../components/AkuntabilitasStatis";
import Image from "next/image";
import Link from "next/link";
import 'leaflet/dist/leaflet.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MapComponent from "../components/Map";
import Banner from "../components/Banner";
import PerangkatDaerah from "../components/PerangkatDaerah";
import Loader from "@/components/Loader";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  fetchDataBeritaTerbaru,
  fetchDataAplikasiLayanan,
} from "@/apis/fetchdata";

const truncateHTML = (content: string, maxLength: number) => {
  const plainText = content.replace(/<\/?[^>]+(>|$)/g, "");
  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + "..."
    : plainText;
};

const banner = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Menyimpan index gambar yang aktif
  const handleTabClick = (index: React.SetStateAction<number>) => {
    setActiveIndex(index); // Update gambar yang aktif saat tab diklik
  };
  // Fungsi untuk mengubah gambar setiap 5 detik

  const [terbaru, setDataTerbaru] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [layanan, setLayanan] = useState<any[]>([]);

  useEffect(() => {
    fetchDataBeritaTerbaru()
      .then((res: any) => {
        setDataTerbaru(res.data);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchDataAplikasiLayanan()
      .then((res: any) => {
        setLayanan(res.data);
        console.log(res);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % terbaru.length);
    }, 5000); // Pindah gambar setiap 5 detik

    return () => clearInterval(interval); // Membersihkan interval saat komponen unmount
  }, [terbaru.length]);


  useEffect(() => {
    // Fungsi untuk menambahkan script ke dalam body
    const loadScript = (src: string, onLoadCallback?: () => void) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = onLoadCallback || null;
      document.body.appendChild(script);

      // Mengembalikan fungsi cleanup untuk menghapus script saat komponen di-unmount
      return () => {
        document.body.removeChild(script);
      };
    };
    // Memuat file-file secara paralel
    // const removeScript1 = loadScript("/js/tambahan.js", () => {
    //   console.log("Library1.js loaded successfully!");
    // });

    // Memuat file widget kominfo
    const removeScript2 = loadScript(
      "https://widget.kominfo.go.id/gpr-widget-kominfo.min.js",
      () => {
        console.log("gpr-widget-kominfo.min.js loaded successfully!");
      }
    );

    // const removeScript3 = loadScript(
    //   "https://code.responsivevoice.org/responsivevoice.js?key=EPuNa77o",
    //   () => {
    //     console.log("gpr-widget-kominfo.min.js loaded successfully!");
    //   }
    // );

    // Clean up untuk menghapus script jika komponen di-unmount
    return () => {
      // removeScript1();
      removeScript2();
      // removeScript3();
    };
  }, []);

  // if (loading) return <p>Loading...</p>;
  // if (terbaru.length === 0) return <p>No data found</p>;

  const mainArticle = terbaru[0]; // First article for the main display
  const additionalArticles = terbaru.slice(1, 4); // Next three articles for the list

  return (
    <>
      <div className="xb-backtotop">
        <a href="#" className="scroll">
          <i className="far fa-arrow-up" />
        </a>
      </div>

      {/* <Loader /> */}

      <div className="body-overlay" />
      <div>
        <Hero />

        {/* blog start */}
        <section className="blog pos-rel pt-55 pb-30">
          <div className="container">
            <div className="row mt-none-30">
              <div className="col-lg-3 mt-50">
                <div id="gpr-kominfo-widget-container" />
              </div>
              <div className="col-lg-9 mt-30">
                <div className="row" style={{ paddingLeft: 30 }}>
                  <div className="xb-service__top ul_li_between">
                    <div className="sec-title sec-title--travel">
                      <span className="subtitle">
                        Informasi Pemerintahan Daerah
                      </span>
                      <h3 className="sec-title--heading">Berita Terbaru</h3>
                    </div>
                    <div className="xb-service__btn">
                      <Link href="/berita" className="xb-tran-btn__xp">
                        Berita Lainnya
                        <span>
                          <Image
                            src="/img/icon/arrow_right.svg"
                            alt=""
                            width={20}
                            height={20}
                          />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {mainArticle && (
                    <div className="col-lg-8 mt-30">
                      <div className="xb-blog2 xb-blog2--big">
                        <div className="xb-item--inner">
                          <div className="xb-item--img">
                            <Link href={`/berita/${mainArticle.slug}`}>
                              <Image
                                src={mainArticle.thumbnail}
                                alt=""
                                width={800}
                                height={500}
                              />
                            </Link>
                          </div>
                          <div className="xb-item--holder">
                            <div className="xb-item--meta">
                              <span className="xb-item--dots">
                                <span />
                                <span />
                                <span />
                              </span>
                              <ul className="ul_li">
                                <li>
                                  <span>
                                    <Image
                                      src="/img/icon/cat.svg"
                                      alt=""
                                      width={20}
                                      height={20}
                                    />
                                  </span>
                                  {mainArticle.category}
                                </li>
                                <li>
                                  <span>
                                    <Image
                                      src="/img/icon/calendar2.svg"
                                      alt=""
                                      width={20}
                                      height={20}
                                    />
                                  </span>
                                  {mainArticle.published_at}
                                </li>
                                <li>
                                  <span>
                                    <Image
                                      src="/img/icon/comment.svg"
                                      alt=""
                                      width={20}
                                      height={20}
                                    />
                                  </span>
                                  {mainArticle.views}
                                </li>
                              </ul>
                            </div>
                            <h2
                              className="xb-item--title border-effect"
                              style={{ fontSize: 18 }}
                            >
                              <Link href={`/berita/${mainArticle.slug}`}>
                                {mainArticle.title}
                              </Link>
                            </h2>
                            <p
                              className="xb-item--content"
                              style={{ fontSize: 14 }}
                            >
                              {truncateHTML(mainArticle.content, 170)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Additional Articles Section */}
                  <div className="col-lg-4 mt-20">
                    <div className="xb-blog-list">
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        additionalArticles.map((item) => (
                          <div className="xb-blog2" key={item.id}>
                            <div className="xb-item--inner">
                              <div className="xb-item--holder">
                                <div className="xb-item--meta">
                                  <span className="xb-item--dots">
                                    <span />
                                    <span />
                                    <span />
                                  </span>
                                  <ul className="ul_li">
                                    <li>
                                      <span>
                                        <Image
                                          src="/img/icon/cat.svg"
                                          alt=""
                                          width={20}
                                          height={20}
                                        />
                                      </span>
                                      {item.category}
                                    </li>
                                  </ul>
                                </div>
                                <h2
                                  className="xb-item--title border-effect"
                                  style={{ fontSize: 16 }}
                                >
                                  <Link href={`/berita/${item.slug}`}>
                                    {/* {item.title} */}
                                    {truncateHTML(item.title, 60)}
                                  </Link>
                                </h2>
                                <p
                                  className="xb-item--content"
                                  style={{ fontSize: 14 }}
                                >
                                  {truncateHTML(item.content, 80)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="blog-shape">
            <div className="shape shape--1">
              <div className="shape-inner" data-parallax='{"x":-50,"y":-70}'>
                <Image
                  src="/img/shape/b_shape1.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="shape shape--2">
              <div className="shape-inner" data-parallax='{"x":50,"y":-80}'>
                <Image
                  src="/img/shape/b_shape2.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </section>
        {/* blog end */}

        <Akuntabilitas />

        {/* country start */}
        <section className="country pt-55 pb-30">
          <div className="container">
            <div className="row mb-30 align-items-center">
              <div className="col-lg-6">
                <div className="sec-title_cs">
                  <h2 className="mb-20 wow skewIn">
                    SPBE <br />
                    <span>Kabupaten Ogan Ilir</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <div className="sec-title mb-20">
                  <p>
                    <span className="title_spbe text-dark fw-bold">
                      SPBE (Sistem Pemerintahan Berbasis Elektronik)
                    </span>{" "}
                    <br /> di Lingkungan Pemerintahan Daerah Kabupaten Ogan Ilir{" "}
                  </p>
                </div>
              </div>
            </div>
            <ul
              className="xb-country-nav nav nav-tabs ul_li_between mb-65"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="xbc-tab1"
                  data-bs-toggle="tab"
                  data-bs-target="#xbc-tab-pane1"
                  type="button"
                  role="tab"
                  aria-controls="xbc-tab-pane1"
                  aria-selected="true"
                >
                  Nomor Telepon Darurat
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="xbc-tab3"
                  data-bs-toggle="tab"
                  data-bs-target="#xbc-tab-pane3"
                  type="button"
                  role="tab"
                  aria-controls="xbc-tab-pane3"
                  aria-selected="false"
                >
                  Layanan Publik
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="xbc-tab4"
                  data-bs-toggle="tab"
                  data-bs-target="#xbc-tab-pane4"
                  type="button"
                  role="tab"
                  aria-controls="xbc-tab-pane4"
                  aria-selected="false"
                >
                  Perangkat Daerah
                </button>
              </li>
            </ul>

            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane animated fadeInUp show active"
                id="xbc-tab-pane1"
                role="tabpanel"
                aria-labelledby="xbc-tab1"
                tabIndex={0}
              >
                <div className="xb-country ul_li">
                  <section className="testimonial bg_img pt-210 pb-100">
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col-lg-12">
                          <div className="xb-slider">
                            <Slider {...banner}>
                              <div className="">
                                <a
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                  className="xb-item--img img-fluid large-image"
                                >
                                  <Image
                                    src="/img/banner/layanan.png"
                                    alt=""
                                    width={2000}
                                    height={100}
                                  />
                                </a>
                              </div>
                              <div className="">
                                <a
                                  onClick={(e) => e.preventDefault()}
                                  href="#"
                                  className="xb-item--img img-fluid large-image"
                                >
                                  <Image
                                    src="/img/banner/layanan.png"
                                    alt=""
                                    width={2000}
                                    height={100}
                                  />
                                </a>
                              </div>
                            </Slider>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* telpon nomor darurat button */}
                    <div className="text-center">
                      <button
                        className="btn btn-info btn-lg me-3 text-center text-white"
                        style={{ backgroundColor: "#164cbb" }}
                        onClick={() => (window.location.href = "tel:112")}
                      >
                        <Image
                          src="/img/icon/f_call.svg"
                          alt="call icon"
                          className="me-2"
                          style={{ width: "24px", height: "24px" }}
                          height={24}
                          width={24}
                        />
                        Calling
                      </button>
                    </div>
                  </section>
                </div>
              </div>

              <div
                className="tab-pane animated fadeInUp"
                id="xbc-tab-pane3"
                role="tabpanel"
                aria-labelledby="xbc-tab3"
                tabIndex={0}
              >
                <div className="xb-country ul_li">
                  {loading ? (
                    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div className="xb-item--item" key={index}>
                          <Skeleton height={150} width={150} />
                          <h3 className="xb-item--title">
                            <Skeleton count={1} />
                          </h3>
                        </div>
                      ))}
                    </SkeletonTheme>
                  ) : layanan && layanan.length > 0 ? (
                    layanan.map((item, index) => (
                      <div className="xb-item--item" key={index}>
                        <a
                          href={item.url_web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="xb-item--inner ul_li"
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            height: "180px",
                            backgroundColor: "white",
                            backgroundPosition: "calc(109% + 0.5rem) 85%",
                            backgroundSize: "20% auto",
                            backgroundRepeat: "no-repeat",
                            backgroundImage:
                              "url('https://aptika.oganilirkab.go.id/public_assets/new_assets/assets/img/misc/infography.svg')",
                          }}
                        >
                          <div className="xb-item--flag">
                            <Image
                              src={item.thumbnail}
                              alt={item.nama_aplikasi || "No Image"}
                              width={150}
                              height={150}
                            />
                          </div>
                          <h3 className="xb-item--title">
                            {item.nama_aplikasi}
                          </h3>
                        </a>
                      </div>
                    ))
                  ) : (
                    <p>Data layanan tidak tersedia.</p>
                  )}

                  <div className="xb-item--item">
                    <a
                      href="https://aptika.oganilirkab.go.id/aplikasi-pusat"
                      className="xb-item--inner ul_li"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "180px",
                        backgroundColor: "white",
                        backgroundPosition: "calc(109% + 0.5rem) 85%",
                        backgroundSize: "20% auto",
                        backgroundRepeat: "no-repeat",
                        backgroundImage:
                          "url('https://aptika.oganilirkab.go.id/public_assets/new_assets/assets/img/misc/infography.svg')",
                      }}
                    >
                      <div className="xb-item--flag">
                        <Image
                          src="/img/more.svg"
                          alt="Selengkapnya"
                          width={150}
                          height={150}
                        />
                      </div>
                      <h3 className="xb-item--title">
                        Selengkapnya
                        <br />{" "}
                      </h3>
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane animated fadeInUp"
                id="xbc-tab-pane4"
                role="tabpanel"
                aria-labelledby="xbc-tab4"
                tabIndex={0}
              >
                <PerangkatDaerah />
              </div>
            </div>
          </div>
        </section>
        {/* country end */}

        {/* coaching single start */}
        <section className="coaching-single pt-55 pb-30">
          <div className="container">
            <div className="row mb-30 align-items-center">
              <div className="col-lg-6">
                <div className="sec-title_cs">
                  <h2 className="mb-20 wow skewIn">Kabupaten Ogan Ilir</h2>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <div className="sec-title mb-20">
                  <p>
                    <span className="title_spbe text-dark fw-bold">
                      Lebih Dekat tentang Pemerintah Daerah Kabupaten Ogan Ilir
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="sidebar-widget">
                  <div className="widget">
                    <ul
                      className="widget-category country-widget list-unstyled"
                      style={{ height: 560, overflowY: "scroll" }}
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <a
                          href="#"
                          className="nav-link "
                          id="xbc-pdd"
                          data-bs-toggle="tab"
                          data-bs-target="#xbc-tab-pdd"
                          type="button"
                          role="tab"
                          aria-controls="xbc-tab-pdd"
                          aria-selected="true"
                        >
                          Profil Kabupaten Ogan Ilir
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          href="#"
                          className="nav-link active"
                          id="xbc-jk"
                          data-bs-toggle="tab"
                          data-bs-target="#xbc-tab-jk"
                          type="button"
                          role="tab"
                          aria-controls="xbc-tab-jk"
                          aria-selected="true"
                        >
                          Wilayah &amp; Kependudukan
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          href="#"
                          className="nav-link"
                          id="xbc-edu"
                          data-bs-toggle="tab"
                          data-bs-target="#xbc-tab-edu"
                          type="button"
                          role="tab"
                          aria-controls="xbc-tab-edu"
                          aria-selected="true"
                        >
                          Sarana Transportasi
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane animated fadeInUp"
                    id="xbc-tab-pdd"
                    role="tabpanel"
                    aria-labelledby="xbc-pdd"
                    tabIndex={0}
                  >
                    <div className="row">
                      <video className="video_profil" controls height="508">
                        <source
                          src="/video/Profil_Ogan_Ilir.mp4"
                          type="video/mp4"
                        />
                        <source
                          src="/video/Profil_Ogan_Ilir.ogg"
                          type="video/ogg"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>

                  <div
                    className="tab-pane animated fadeInUp show active"
                    id="xbc-tab-jk"
                    role="tabpanel"
                    aria-labelledby="xbc-jk"
                    tabIndex={0}
                  >
                    <div className="row">
                      <MapComponent />
                    </div>
                  </div>

                  <div
                    className="tab-pane animated fadeInUp"
                    id="xbc-tab-edu"
                    role="tabpanel"
                    aria-labelledby="xbc-edu"
                    tabIndex={0}
                  >
                    <div className="d-flex gap-2">
                      <style jsx>{`
                        video.video_profil_senai {
                          width: auto;
                          height: 512px;
                          border-radius: 12px;
                          border: 5px solid #edf3f5;
                          padding: 0;
                        }
                        img.images_bisenai {
                          width: 410px !important;
                          height: 500px !important;
                          border-radius: 12px;
                          padding: 0;
                          border: 5px solid #edf3f5;
                        }
                      `}</style>

                      <video className="video_profil_senai" controls>
                        <source src="/video/transenai.mp4" type="video/mp4" />
                        <source src="/video/transenai.ogg" type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>

                      <Image
                        className="images_bisenai"
                        src="/video/bisenai.jpeg"
                        alt="Gambar Profil"
                        width={410}
                        height={200}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* coaching single end */}

        {/* coaching single start */}
        <MediaSosial />
        {/* coaching single end */}

        {/* Banner start */}
        <Banner />
        {/* Banner end */}

        {/* Share Button */}
        <div className="shareit">
          <a
            className="facebook"
            href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL"
            target="blank"
            title="facebook"
          >
            <i className="ph ph-facebook-logo" />
          </a>
          <a
            className="instagram"
            href="https://www.linkedin.com/shareArticle?mini=true&url=YOUR_URL&title=YOUR_TITLE"
            target="blank"
            title="instagram"
          >
            <i className="ph ph-instagram-logo" />
          </a>
          {/* reddit */}
        </div>
        {/* End Share Button */}
      </div>
    </>
  );
}

export default Home;