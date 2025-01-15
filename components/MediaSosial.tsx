import { useEffect, useState } from "react";

const MediaSosial = () => {

  return (
    <div>
      <section className="blog pos-rel pt-130 pb-130">
        <div className="container">
          <div className="row mt-none-30">
            <div className="col-lg-6">
              <div className="sec-title_cs">
                <h2 className="mb-20 wow skewIn">
                  Media Sosial <br />
                  <span>Pemerintah Kabupaten Ogan Ilir</span>
                </h2>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="sec-title mb-20">
                <p>
                  <span className="title_spbe text-dark fw-bold">
                    Temukan Media Sosial Resmi Pemerintah Daerah Kabupaten Ogan
                    Ilir
                  </span>{" "}
                  <br /> di Lingkungan Pemerintahan Daerah Kabupaten Ogan Ilir{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex gap-3 responsive-flex">
            <div>
              <div className="xb-blog2">
                <iframe
                  width="100%"
                  height={315}
                  style={{ borderRadius: 12 }}
                  src="https://www.youtube.com/embed/UAMSGOspekA?si=U9XL3EQl9pSJn1U5"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen=""
                />
              </div>
              <div className="row mt-10">
                <div className="xb-blog-list d-flex flex-wrap gap-2">
                  <div className="col mx-auto">
                    <div className="xb-blog">
                      <iframe
                        width="100%"
                        height={120}
                        style={{ borderRadius: 12 }}
                        src="https://www.youtube.com/embed/UAMSGOspekA?si=U9XL3EQl9pSJn1U5"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen=""
                      />
                    </div>
                  </div>
                  <div className="col mx-auto">
                    <div className="xb-blog">
                      <iframe
                        width="100%"
                        height={120}
                        style={{ borderRadius: 12 }}
                        src="https://www.youtube.com/embed/Dt__QQfRxEA?si=ItTDbfLbwMnBYayn"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen=""
                      />
                    </div>
                  </div>
                  <div className="col mx-auto">
                    <div className="xb-blog">
                      <iframe
                        width="100%"
                        height={120}
                        style={{ borderRadius: 12 }}
                        src="https://www.youtube.com/embed/Dt__QQfRxEA?si=ItTDbfLbwMnBYayn"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen=""
                      />
                    </div>
                  </div>
                  <div className="col mx-auto">
                    <div className="xb-blog">
                      <iframe
                        width="100%"
                        height={120}
                        style={{ borderRadius: 12 }}
                        src="https://www.youtube.com/embed/Dt__QQfRxEA?si=ItTDbfLbwMnBYayn"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="medsos-css">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100069050955230&tabs=timeline&width=340&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=335312914887042"
                width={340}
                height={400}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
            <div className="medsos-css">
              <iframe
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
                src="https://www.instagram.com/pemkab.oganilir/embed/"
                width={340}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaSosial;
