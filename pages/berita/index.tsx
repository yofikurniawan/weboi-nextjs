import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchDataBerita } from "@/apis/fetchdata";
import Scroll from "@/components/Scroll";
import Pagination from "@/components/Pagination"; // Import komponen Pagination
import Link from "next/link";

const Berita = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  const page = parseInt(router.query.page as string) || 1;
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true);

      try {
        const res = await fetchDataBerita(page.toString());

        // Check if res.data exists and is an array, then set it
        setData(Array.isArray(res.data) ? res.data : []);
        setCurrentPage(res.current_page || 1);
        setTotalPages(res.last_page || 1);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Set an empty array in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [page, router.query.page]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      router.push(`/berita?page=${page}`, undefined, { scroll: false });
    }
  };

  const renderPagination = () => {
    const pagination = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    pagination.push(
      <li key="first">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(1);
          }}
          className={currentPage === 1 ? "disabled" : ""}
        >
          1
        </a>
      </li>
    );

    if (startPage > 2) {
      pagination.push(
        <li key="start-ellipsis">
          <span>...</span>
        </li>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(
        <li key={i}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            className={currentPage === i ? "current_page" : ""}
          >
            {i}
          </a>
        </li>
      );
    }

    if (endPage < totalPages - 1) {
      pagination.push(
        <li key="end-ellipsis">
          <span>...</span>
        </li>
      );
    }

    pagination.push(
      <li key="last">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(totalPages);
          }}
          className={currentPage === totalPages ? "disabled" : ""}
        >
          {totalPages}
        </a>
      </li>
    );

    return pagination;
  };

  return (
    <>
      <Head>
        <title>List Berita | Web Ogan Ilir</title>
      </Head>
      <Scroll />
      <div>
        <Breadcrumb
          breadcrumbData={[
            { title: "Home", url: "/" },
            { title: "Daftar Berita" },
          ]}
        />
        <section className="blog pt-120 pb-120">
          <div className="container">
            <div className="row">
              {loading ? (
                <div className="row">
                  {Array.from({ length: itemsPerPage }).map((_, index) => (
                    <div className="col-lg-4 mb-4" key={index}>
                      <SkeletonTheme
                        baseColor="#e0e0e0"
                        highlightColor="#f5f5f5"
                      >
                        <Skeleton height={400} />
                      </SkeletonTheme>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row">
                  {data.length > 0 ? (
                    data.map((item: any) => (
                      <div className="col-lg-4 mb-4" key={item.id}>
                        <div className="bloglist s2 item">
                          <div className="post-content">
                            <div
                              className="post-image"
                              style={{ position: "relative" }}
                            >
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
                                  style={{ fontSize: "30px", fontWeight: 700 }}
                                >
                                  {new Date(item.published_at).getDate()}
                                </div>
                                <div style={{ fontSize: "12px" }}>
                                  {new Date(item.published_at).toLocaleString(
                                    "default",
                                    { month: "short", year: "numeric" }
                                  )}
                                </div>
                              </div>

                              <div
                                style={{
                                  position: "absolute",
                                  top: "15px",
                                  right: "15px",
                                  backgroundColor: "#006400",
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

                              <Image
                                style={{
                                  borderRadius: "10px",
                                  height: "250px",
                                  objectFit: "cover",
                                }}
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
                                style={{ paddingTop: "10px" }}
                              >
                                <div
                                  className="d-flex align-items-center text-muted"
                                  style={{ fontSize: "13px" }}
                                >
                                  <i className="fa fa-user me-1"></i>
                                  <span>{item.author || "Admin"}</span>
                                </div>
                                <div
                                  className="d-flex align-items-center text-muted"
                                  style={{ fontSize: "13px" }}
                                >
                                  <i className="fa fa-calendar me-1"></i>
                                  <span>
                                    {new Date(
                                      item.published_at_full
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <Link
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
                              </Link>
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

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            
          </div>
        </section>
      </div>
    </>
  );
};

export default Berita;
