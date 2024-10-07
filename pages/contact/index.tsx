import { useEffect, useState } from "react";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import { fetchDataIdentity } from "@/apis/fetchdata";

const Contact: React.FC = () => {
  const [identity, setIdentity] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true saat fetching data
      try {
        const res = await fetchDataIdentity();
        if (res && res.success && res.data) {
          setIdentity(res.data); // Mengambil data dari objek data
          setErrorMessage(""); // Reset error message jika data ditemukan
        } else {
          setErrorMessage("Data identitas tidak ditemukan.");
        }
      } catch (error) {
        setErrorMessage("Gagal memuat data identitas.");
      } finally {
        setLoading(false); // Set loading ke false setelah fetching
      }
    };

    fetchData();
  }, []);

  type BreadcrumbType = {
    title: string;
    url?: string;
  };

  const breadcrumbData: BreadcrumbType[] = [
    { title: "Home", url: "/" },
    { title: "Kontak" },
  ];

  return (
    <>
      <div>
        <Breadcrumb breadcrumbData={breadcrumbData} />

        <section className="contact pt-120 pb-130">
          {loading ? (
            <p>Loading...</p>
          ) : errorMessage ? (
            <p className="text-danger">{errorMessage}</p>
          ) : (
            <div className="container">
              <div className="sec-title mb-30">
                <h2
                  className="mb-30 wow skewIn"
                  style={{ visibility: "visible", fontSize: "34px" }}
                >
                  {identity.website_name} <br />
                </h2>
                <p
                  style={{
                    width: "55%",
                    textAlign: "justify",
                    fontSize: "18px",
                  }}
                >
                  {identity.description}
                </p>
              </div>
              <div className="row align-items-center">
                <div className="col-xl-8 col-lg-10">
                  <div className="single-content__feature ul_li">
                    {/* Email Section */}
                    <div className="single-content-feature">
                      <div className="xb-item--inner ul_li">
                        <div className="xb-item--icon">
                          <Image
                            src="/img/icon/f_mail.svg"
                            alt=""
                            width={24}
                            height={24}
                          />
                        </div>
                        <h3 className="xb-item--title">
                          <a
                            href={`mailto:${identity.email}`}
                            className="no-link-style"
                          >
                            {identity.email}
                          </a>
                        </h3>
                      </div>
                    </div>

                    {/* Telephone Section */}
                    <div className="single-content-feature">
                      <div className="xb-item--inner color-2 ul_li">
                        <div className="xb-item--icon">
                          <Image
                            src="/img/icon/f_call.svg"
                            alt=""
                            width={24}
                            height={24}
                          />
                        </div>
                        <h3 className="xb-item--title">
                          <a
                            href={`tel:${identity.telephone}`}
                            className="no-link-style"
                          >
                            {identity.telephone}
                          </a>
                        </h3>
                      </div>
                    </div>

                    {/* Instagram Section */}
                    <div className="single-content-feature">
                      <div className="xb-item--inner color-4 ul_li">
                        <div className="xb-item--icon">
                          <Image
                            src="/img/icon/ig.svg"
                            alt="Instagram Icon"
                            width={24}
                            height={24}
                          />
                        </div>
                        <h3 className="xb-item--title">
                          <a
                            href={identity.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-link-style"
                          >
                            Instagram
                          </a>
                        </h3>
                      </div>
                    </div>

                    {/* Facebook Section */}
                    <div className="single-content-feature">
                      <div className="xb-item--inner color-3 ul_li">
                        <div className="xb-item--icon">
                          <Image
                            src="/img/icon/fb.svg"
                            alt="Facebook Icon"
                            width={24}
                            height={24}
                          />
                        </div>
                        <h3 className="xb-item--title">
                          <a
                            href={identity.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-link-style"
                          >
                            Facebook
                          </a>
                        </h3>
                      </div>
                    </div>

                    {/* YouTube Section */}
                    <div className="single-content-feature">
                      <div className="xb-item--inner color-4 ul_li">
                        <div className="xb-item--icon">
                          <Image
                            src="/img/icon/yt.svg"
                            alt=""
                            width={24}
                            height={24}
                          />
                        </div>
                        <h3 className="xb-item--title">
                          <a
                            href={identity.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-link-style"
                          >
                            Youtube
                          </a>
                        </h3>
                      </div>
                    </div>

                    {/* CSS for Links */}
                    <style jsx>{`
                      .no-link-style {
                        color: inherit; /* Menjaga warna teks */
                        text-decoration: none; /* Menghapus underline */
                      }

                      .no-link-style:hover {
                        color: #f06292; /* Warna saat hover */
                      }
                    `}</style>
                  </div>
                </div>
              </div>
              <div className="map-container">
                <iframe
                  src={identity.googlemap}
                  width="800px"
                  height="790px"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Contact;
