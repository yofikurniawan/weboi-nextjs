import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchDataVideoTerbaru } from "@/apis/fetchdata";

const MediaSosial = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <section className="blog pos-rel pt-130 pb-50">
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
            <div className="medsos-yt">
              <div className="xb-blog2">
                {videos.length > 0 && (
                  <iframe
                    className="frame-yt-main"
                    width="100%"
                    src={`https://www.youtube.com/embed/${videos[0]?.link}`}
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                )}
              </div>
              <div className="row mt-10">
                <div
                  className="xb-blog-list d-flex flex-wrap gap-2"
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  {videos.slice(1, 5).map((video, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="col mx-auto">
                      <div className="xb-blog">
                        <iframe
                          width="100%"
                          height={120}
                          style={{ borderRadius: 12 }}
                          src={`https://www.youtube.com/embed/${video.link}`}
                          title="YouTube video player"
                          frameBorder={0}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      </div>
                    </div>
                  ))}
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
