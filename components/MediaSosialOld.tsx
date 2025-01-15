import { useEffect, useState } from "react";

declare global {
  interface Window {
    FB: any;
  }
}
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchDataVideoTerbaru } from "@/apis/fetchdata";

const MediaSosialOld = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [facebookLoaded, setFacebookLoaded] = useState(false); // State untuk memaksa render ulang elemen Facebook

  useEffect(() => {
    fetchDataVideoTerbaru()
      .then((res: any) => {
        if (res?.data) {
          setVideos(res.data);
          setError(null);
        } else {
          setError("Data tidak ditemukan.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setError("Terjadi kesalahan saat mengambil data. Silakan coba lagi.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Memuat Facebook SDK jika belum dimuat
    if (
      typeof window !== "undefined" &&
      !document.getElementById("facebook-sdk")
    ) {
      const fbScript = document.createElement("script");
      fbScript.id = "facebook-sdk";
      fbScript.async = true;
      fbScript.defer = true;
      fbScript.crossOrigin = "anonymous";
      fbScript.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v11.0&appId=358080444571252&autoLogAppEvents=1";
      fbScript.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse();
          setFacebookLoaded(true); // Set state setelah SDK selesai dimuat
        }
      };
      document.body.appendChild(fbScript);
    } else if (typeof window !== "undefined" && window.FB) {
      window.FB.XFBML.parse();
      setFacebookLoaded(true); // Set state jika SDK sudah tersedia
    }
  }, []);

  useEffect(() => {
    // Paksa render ulang elemen embed Facebook saat kembali ke halaman ini
    if (facebookLoaded && window.FB) {
      window.FB.XFBML.parse();
    }
  }, [facebookLoaded]);

  if (loading) {
    return (
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
        <div className="container">
          <div className="row mt-50">
            <div className="col-12 col-lg-7">
              <Skeleton height={500} style={{ borderRadius: 12 }} />
            </div>
            <div className="col-12 col-lg-2">
              <div className="d-flex flex-column gap-3">
                {[...Array(4)].map((_, index) => (
                  <Skeleton
                    key={index}
                    height={120}
                    style={{ borderRadius: 12 }}
                  />
                ))}
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <Skeleton height={500} style={{ borderRadius: 12 }} />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  if (error) {
    return (
      <div className="container mt-50">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

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
          <div className="row mt-50">
            <div className="col-12 col-lg-7">
              <div className="xb-blog2">
                {videos.length > 0 && (
                  <iframe
                    width="100%"
                    height={500}
                    style={{ borderRadius: 12 }}
                    src={`https://www.youtube.com/embed/${videos[0]?.link}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                )}
              </div>
            </div>
            <div className="col-12 col-lg-2">
              <div className="xb-blog-list justify-content-center">
                {videos.slice(1, 5).map((video, index) => (
                  <div className="xb-blog" key={video.id || index}>
                    <iframe
                      width="100%"
                      height={120}
                      style={{ borderRadius: 12 }}
                      src={`https://www.youtube.com/embed/${video.link}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Instagram</h4>
              <iframe
                src="https://www.instagram.com/pemkab.oganilir/embed/"
                width={420}
                height={550}
              />
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Facebook</h4>
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100069050955230&tabs=timeline&width=340&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=335312914887042"
                width={420}
                height={750}
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                allowFullScreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
              {/*  */}
            </div>

            {/* Bagian Halaman Facebook */}
            <div className="col-12 col-lg-3">
              <div className="news-poster">
                <div id="fb-root"></div>
                {facebookLoaded && (
                  <div
                    className="fb-page"
                    data-href="https://www.facebook.com/120208052015160/"
                    data-tabs="timeline"
                    data-width="380"
                    data-height="500"
                    data-small-header="true"
                    data-adapt-container-width="false"
                    data-hide-cover="false"
                    data-show-facepile="true"
                  >
                    <blockquote
                      cite="https://www.facebook.com/120208052015160/"
                      className="fb-xfbml-parse-ignore"
                    >
                      <a href="https://www.facebook.com/120208052015160/">
                        Ogan Ilir
                      </a>
                    </blockquote>
                  </div>
                )}
              </div>
            </div>


          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaSosialOld;
