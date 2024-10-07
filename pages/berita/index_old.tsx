import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  fetchDataBerita,
} from "@/apis/fetchdata";

import { getDataFromIndexedDB, saveDataToIndexedDB } from '@/utils/indexedDB'; // Import IndexedDB utilities

const Berita = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  const page = parseInt(router.query.page as string) || 1;

  type Breadcrumb = {
    title: string;
    url?: string;
  };

  const breadcrumbData: Breadcrumb[] = [
    { title: "Home", url: "/" },
    { title: "Daftar Berita" },
  ];

  const itemsPerPage = 6;

  useEffect(() => {
    const page = parseInt(router.query.page as string) || 1;

    fetchDataBerita(page.toString())
      .then((res: any) => {
        setData(res.data);
        setCurrentPage(res.current_page);
        setTotalPages(res.last_page);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error(error);
        setLoading(false);
      });
  }, [router.query.page]);


  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      router.push(`/berita?page=${page}`);
    }
  };

  const truncateHTML = (content: string, maxLength: number) => {
    const plainText = content.replace(/<\/?[^>]+(>|$)/g, "");
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  return (
    <>
      <Head>
        <title>List Berita | Web Ogan Ilir</title>
      </Head>
      <div>
        <Breadcrumb breadcrumbData={breadcrumbData} />

        <section className="blog pt-120 pb-120">
          <div className="container">
            <div className="row">
              {loading ? (
                <div className="row">
                  {Array.from({ length: itemsPerPage }).map((_, index) => (
                    <div className="col-lg-4 mb-4" key={index}>
                      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
                        <Skeleton height={400} />
                      </SkeletonTheme>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row">
                  {data.length > 0 ? (
                    data.map((item: any) => (
                      <div
                        className="col-lg-4 mb-4"
                        style={{
                          backgroundSize: "100%",
                          backgroundRepeat: "no-repeat",
                        }}
                        key={item.id}
                      >
                        <div
                          className="bloglist s2 item"
                          style={{
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <div
                            className="post-content"
                            style={{
                              backgroundSize: "100%",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <div
                              className="post-image"
                              style={{
                                backgroundSize: "100%",
                                backgroundRepeat: "no-repeat",
                                position: "relative", // Tambahkan relative untuk positioning anak-anaknya
                              }}
                            >
                              {/* Badge untuk tanggal */}
                              <div
                                style={{
                                  width: "54px",
                                  backgroundColor: "#2553b9",
                                  position: "absolute",
                                  textAlign: "center",
                                  color: "#fff",
                                  margin: "15px",
                                  padding: "5px",
                                  borderRadius: "5px",
                                }}
                              >
                                <div
                                  className="m"
                                  style={{
                                    fontSize: "30px",
                                    fontWeight: 700,
                                  }}
                                >
                                  {new Date(item.published_at).getDate()}
                                </div>
                                <div
                                  className="d text-uppercase"
                                  style={{
                                    fontSize: "12px",
                                  }}
                                >
                                  {new Date(item.published_at).toLocaleString(
                                    "default",
                                    {
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )}
                                </div>
                              </div>

                              {/* Badge untuk kategori */}
                              <div
                                style={{
                                  position: "absolute",
                                  top: "15px", // Jarak dari atas
                                  right: "15px", // Jarak dari kanan
                                  backgroundColor: "#006400", // Warna background badge kategori
                                  color: "#fff",
                                  padding: "5px 10px",
                                  borderRadius: "5px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  textTransform: "uppercase",
                                }}
                              >
                                {item.category || "Kategori"}
                              </div>

                              {/* Gambar berita */}
                              <Image
                                style={{ borderRadius: "10px" }}
                                alt={item.title}
                                src={
                                  item.thumbnail || "/img/web/img/default.jpg"
                                }
                                className="lazy"
                                width={400}
                                height={250}
                              />
                            </div>

                            <div
                              style={{
                                borderBottom: "solid 2px #2553b9",
                                padding: "20px 30px",
                                background: "#fff",
                                margin: "20px",
                                marginTop: "-40px",
                                position: "relative",
                                zIndex: 100,
                                borderRadius: "10px",
                              }}
                            >
                              <h4>
                                <a
                                  href={`/berita/${item.slug}`}
                                  style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    color: "#000",
                                  }}
                                >
                                  {item.title}
                                </a>
                              </h4>
                              <div
                                className="d-flex align-items-center gap-3 mb-3"
                                style={{
                                  paddingTop: "10px",
                                }}
                              >
                                <div
                                  className="d-flex align-items-center text-muted"
                                  style={{
                                    fontSize: "13px",
                                  }}
                                >
                                  <i className="fa fa-user me-1"></i>
                                  <span>{item.author || "Admin"}</span>
                                </div>
                                <div
                                  className="d-flex align-items-center text-muted"
                                  style={{
                                    fontSize: "13px",
                                  }}
                                >
                                  <i className="fa fa-calendar me-1"></i>
                                  <span>
                                    {new Date(
                                      item.published_at_full
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <a
                                style={{
                                  color: "#fff",
                                  background: "#2553b9",
                                  fontWeight: 700,
                                  padding: "10px 20px",
                                  borderRadius: "5px",
                                }}
                                className="btn btn-primary btn-sm"
                                href={`/berita/${item.slug}`}
                              >
                                Baca Selengkapnya...
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-lg-4 mb-4">
                      <p>Tidak ada data yang tersedia.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pagination_wrap pt-20">
              <ul>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "disabled" : ""}
                  >
                    <i className="far fa-long-arrow-left" />
                  </a>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index + 1}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(index + 1);
                      }}
                      className={
                        currentPage === index + 1 ? "current_page" : ""
                      }
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "disabled" : ""}
                  >
                    <i className="far fa-long-arrow-right" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Berita;
