import React from "react";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import { fetchDataIdentity } from "@/apis/fetchdata";
import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";

const Contact = () => {
  const [identity, setIdentity] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchDataIdentity();
        if (res && res.success && res.data) {
          setIdentity(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const breadcrumbData = [{ title: "Beranda", url: "/" }, { title: "Kontak" }];

  const ContactSkeleton = () => (
    <div className="container">
      <div className="sec-title mb-30">
        <div className="mb-30">
          <Skeleton height={40} width={300} />
        </div>
        <Skeleton height={100} width="55%" />
      </div>
      <div className="row align-items-center">
        <div className="col-xl-8 col-lg-10">
          <div className="single-content__feature ul_li">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="single-content-feature mb-4">
                <div className="xb-item--inner ul_li">
                  <div className="xb-item--icon">
                    <Skeleton circle width={24} height={24} />
                  </div>
                  <div
                    className="xb-item--title"
                    style={{ marginLeft: "15px" }}
                  >
                    <Skeleton width={200} height={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="map-container mt-4">
        <Skeleton height={790} width={800} />
      </div>
    </div>
  );

  return (
    <>
      <div>
        <Breadcrumb breadcrumbData={breadcrumbData} />

        <section className="contact pt-120 pb-130">
          {!identity ? (
            <ContactSkeleton />
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
                            src="/images/icon/f_mail.svg"
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
                            src="/images/icon/f_call.svg"
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

                    {/* Social Media Sections */}
                    {/* Instagram */}
                    <div className="single-content-feature">
                      <div className="xb-item--inner color-4 ul_li">
                        <div className="xb-item--icon">
                          <Image
                            src="/images/icon/ig.svg"
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

                    {/* Facebook */}
                    <div className="single-content-feature">
                      <div className="xb-item--inner color-3 ul_li">
                        <div className="xb-item--icon">
                          <Image
                            src="/images/icon/fb.svg"
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

                    {/* YouTube */}
                    <div className="single-content-feature">
                      <div className="xb-item--inner color-4 ul_li">
                        <div className="xb-item--icon">
                          <Image
                            src="/images/icon/yt.svg"
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

      <style jsx>{`
        .no-link-style {
          color: inherit;
          text-decoration: none;
        }

        .no-link-style:hover {
          color: #f06292;
        }

        .ul_li {
          display: flex;
          align-items: center;
        }

        .single-content-feature {
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default Contact;
