import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import { fetchDataPrestasi } from "@/apis/fetchdata";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Scroll from "@/components/Scroll";

const Penghargaan = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const breadcrumbData: Breadcrumb[] = [
    { title: "Home", url: "/" },
    { title: "Daftar Penghargaan" },
  ];

  useEffect(() => {
    let isMounted = true;

    const page = parseInt(router.query.page as string) || 1;

    setLoading(true);
    fetchDataPrestasi(page.toString())
      .then((res: any) => {
        console.log("API Response:", res);
        if (isMounted) {
          if (res.success && Array.isArray(res.data)) {
            setData(res.data);
            setCurrentPage(res.current_page);
            setTotalPages(res.last_page);
          } else {
            setData([]);
          }
          setLoading(false);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [router.query.page]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      router.push(`/prestasi?page=${page}`);
    }
  };

  return (
    <>
      <Head>
        <title>Penghargaan | Web Ogan Ilir</title>
      </Head>
      <Breadcrumb breadcrumbData={breadcrumbData} />
      <Scroll />

      <section className="coaching pt-130 pb-120">
        <div className="container">
          <div className="row mt-none-30">
            <div className="sec-title sec-title--travel text-center mb-60">
              <span className="subtitle">
                Daftar Penghargaan yang pernah diraih
              </span>
              <h2>Penghargaan</h2>
            </div>

            <div className="col-12 mt-30">
              <div className="table-responsive">
                {loading ? (
                  // Skeleton loader while data is loading
                  <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
                    <Skeleton height={50} count={5} />
                  </SkeletonTheme>
                ) : Array.isArray(data) && data.length > 0 ? (
                  <table className="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="bg-primary text-white">No</th>
                        <th className="bg-primary text-white">Gambar</th>
                        <th className="bg-primary text-white">Keterangan</th>
                        <th className="bg-primary text-white">Tingkat/Level</th>
                        <th className="bg-primary text-white">Tahun</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>
                            <a
                              href={item.thumbnail || "/img/web/sertfikat.webp"}
                              data-bs-toggle="lightbox"
                              data-bs-caption={item.nama_prestasi}
                            >
                              <Image
                                src={
                                  item.thumbnail || "/img/web/sertfikat.webp"
                                }
                                width={100}
                                height={100}
                                alt={item.nama_prestasi}
                              />
                            </a>
                          </td>
                          <td>{item.nama_prestasi}</td>
                          <td>{item.tingkat}</td>
                          <td>{item.tahun}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Tidak ada data penghargaan yang tersedia.</p>
                )}
              </div>

              <div className="row">
                <div className="pagination_wrap pt-90">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Penghargaan;
