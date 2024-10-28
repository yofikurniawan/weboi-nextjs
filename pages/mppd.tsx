import Image from "next/image";
import { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useEffect, useState } from "react";

const Mppd = () => {
  const swiperRef = useRef<SwiperType>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // Cek jika kita berada di sisi klien
    if (typeof window !== "undefined") {
      const storedIndex = localStorage.getItem("activeAccordionIndex");
      if (storedIndex) {
        setActiveIndex(JSON.parse(storedIndex));
      }
    }
  }, []);

  const handleToggle = (index: number) => {
    const newIndex = activeIndex === index ? null : index;
    setActiveIndex(newIndex);
    // Simpan ke localStorage di sisi klien
    if (typeof window !== "undefined") {
      localStorage.setItem("activeAccordionIndex", JSON.stringify(newIndex));
    }
  };

  return (
    <>
      {/* Banner start */}
      <section className="cta cta-mpp-dua">
        <div className="container">
          <div className="xb-brand2__mt slider" style={{ marginTop: "60px" }}>
            <div
              className="xb-cta2"
              style={{ backgroundImage: "url(/images/mppd.png)" }}
            >
              <div className="sec-title sec-title--white sec-title--travel mt-20"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Banner end */}

      {/* team single start */}
      <section className="team-signle">
        <div className="container">
          <div className="row mb-80">
            <div className="col-lg-3 col-md-6 mt-30">
              <div className="team-skills">
                <div className="xb-item--inner mmpds">
                  <h2 className="xb-item--number">
                    <span className="xbo" data-count={90}>
                      00
                    </span>
                  </h2>
                  <h4 className="xb-item--title">Jumlah Instansi</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-30">
              <div className="team-skills style-2">
                <div className="xb-item--inner mmpds">
                  <h2 className="xb-item--number">
                    <span className="xbo" data-count={80}>
                      00
                    </span>
                  </h2>
                  <h4 className="xb-item--title">Jumlah Layanan</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-30">
              <div className="team-skills style-3">
                <div className="xb-item--inner mmpds">
                  <h2 className="xb-item--number">
                    <span className="xbo" data-count={89}>
                      00
                    </span>
                  </h2>
                  <h4 className="xb-item--title">Jumlah Loket</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-30">
              <div className="team-skills style-4">
                <div className="xb-item--inner mmpds">
                  <h2 className="xb-item--number">
                    <span className="xbo" data-count={70}>
                      00
                    </span>
                  </h2>
                  <h4 className="xb-item--title">Jumlah Antrian</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* team single end */}

      {/* faq start */}
      <section className="faq pt-120 pb-110">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="xb-faq-content">
                <div className="sec-title mb-125">
                  <h2 className="mb-30 wow skewIn">
                    Mall Pelayanan Publik <br />
                    <span> Digital Nasional (MPP Digital Nasional)</span>
                  </h2>
                  <p>
                    MPP DIGITAL NASIONAL
                    <br /> Kabupaten Ogan Ilir
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="xb-faq">
                <ul className="accordion_box clearfix">
                  {[
                    {
                      question: "Apa itu MPP Digital Nasional?",
                      answer: (
                        <>
                          <p>
                            <strong className="text-danger">
                              MPP Digital Nasional
                            </strong>{" "}
                            merupakan Pelayanan Publik berbasik elektronik
                            Pemerintah Daerah yang terintegrasi ke dalam satu{" "}
                            <strong className="text-danger">Platform</strong>.
                            MPP Digital menjadi bagian dari strategi taktis guna
                            mempercepat pelayanan publik, termasuk untuk
                            meningkatkan investasi.
                          </p>
                          <p>
                            MPP Digital Nasional tersedia dalam versi Mobile
                            Application berbasis Android yang dapat di download
                            pada link berikut :
                          </p>
                          <button className="btn btn-danger">
                            Download MPP Digital
                          </button>
                        </>
                      ),
                    },
                    {
                      question: "Regulasi Terkait MPP Digital Nasional?",
                      answer: (
                        <ul>
                          <li>
                            <i className="far fa-check" /> Comprehensive Visa
                            Assistance
                          </li>
                          <li>
                            <i className="far fa-check" /> Visa Category
                            Expertise
                          </li>
                          <li>
                            <i className="far fa-check" /> Transparency and
                            Communication
                          </li>
                        </ul>
                      ),
                    },
                    {
                      question: "Produk Pelayanan MPP Digital Nasional?",
                      answer: (
                        <ul>
                          <li>
                            <i className="far fa-check" /> Peraturan Menteri ...
                          </li>
                          <li>
                            <i className="far fa-check" /> Peraturan Daerah ...
                          </li>
                          <li>
                            <i className="far fa-check" /> Keputusan Bupati
                            Kabupaten Ogan Ilir ...
                          </li>
                        </ul>
                      ),
                    },
                    {
                      question: "Buku Panduan MPP Digital Nasional?",
                      answer: (
                        <ul>
                          <li>
                            <i className="far fa-check" /> 
                            Panduan Untuk Penyelenggara Layanan
                          </li>
                          <li>
                            <i className="far fa-check" /> Panduan Layanan Masyarakat
                          </li>
                        </ul>
                      ),
                    },
                  ].map((item, index) => (
                    <li
                      key={index}
                      className={`accordion block ${
                        activeIndex === index ? "active-block" : ""
                      }`}
                    >
                      <div
                        className="acc-btn"
                        onClick={() => handleToggle(index)}
                      >
                        {item.question}
                        <span className="arrow" />
                      </div>
                      <div
                        className={`acc_body ${
                          activeIndex === index ? "current" : ""
                        }`}
                      >
                        <div className="content">{item.answer}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* faq end */}

      {/* Banner start */}
      <section className="cta pt-60 mt-100 mb-80">
        <div className="container">
          <div className="xb-brand2__mt slider">
            <div
              className="xb-cta2"
              style={{ backgroundImage: "url(/images/mppd_download.png)" }}
            >
              <div className="sec-title sec-title--white sec-title--travel mt-20"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Banner end */}

      {/* brand start */}
      <section className="brand pt-60">
        <div className="container">
          <h2 className="brand-title text-center mb-50">
            <span>
              <span>Didukung oleh</span>
            </span>
          </h2>

          <div className="xb-swiper-sliders brand-slider">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              breakpoints={{
                // untuk tampilan mobile
                180: {
                  slidesPerView: 2,
                },
                // untuk tampilan desktop
                1024: {
                  slidesPerView: 6,
                },
              }}
            >
              <SwiperSlide>
                <a href="#!">
                  <Image
                    className="img-dukungan"
                    src="/images/mpp/logo-diskominfo.png"
                    height={150}
                    width={250}
                    alt=""
                  />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#!">
                  <Image
                    className="img-dukungan"
                    src="/images/mpp/bapenda-transp.png"
                    height={150}
                    width={250}
                    alt=""
                  />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#!">
                  <Image
                    className="img-dukungan"
                    src="/images/mpp/bpkad.jpg"
                    height={150}
                    width={250}
                    alt=""
                  />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#!">
                  <Image
                    className="img-dukungan"
                    src="/images/mpp/dpmd.png"
                    height={150}
                    width={250}
                    alt=""
                  />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#!">
                  <Image
                    className="img-dukungan"
                    src="/images/mpp/Logo BKPSDM.png"
                    height={150}
                    width={250}
                    alt=""
                  />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#!">
                  <Image
                    className="img-dukungan"
                    src="/images/mpp/logo-bappeda.png"
                    height={150}
                    width={250}
                    alt=""
                  />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#!">
                  <Image
                    className="img-dukungan"
                    src="/images/mpp/LOGO-DAMKAR.png"
                    height={150}
                    width={250}
                    alt=""
                  />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#!">
                  <Image
                    className="img-dukungan"
                    src="/images/mpp/logo_disdik.png"
                    height={150}
                    width={250}
                    alt=""
                  />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#!">
                  <Image
                    className="img-dukungan"
                    src="/images/mpp/logo bsb.png"
                    height={150}
                    width={250}
                    alt=""
                  />
                </a>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
      {/* brand end */}
    </>
  );
};

export default Mppd;