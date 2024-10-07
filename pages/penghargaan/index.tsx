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
  const [data, setData] = useState<any[]>([]); // Inisialisasi dengan array kosong
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // State untuk loading

  const breadcrumbData: Breadcrumb[] = [
    { title: "Home", url: "/" },
    { title: "Daftar Penghargaan" },
  ];

  useEffect(() => {
    let isMounted = true;

    const page = parseInt(router.query.page as string) || 1;

    setLoading(true); // Set loading ke true saat mulai fetching data
    fetchDataPrestasi(page.toString())
      .then((res: any) => {
        console.log("API Response:", res); // Debugging respons API
        if (isMounted) {
          if (res.success && Array.isArray(res.data)) {
            setData(res.data); // Akses langsung array `data` dari API response
            setCurrentPage(res.current_page);
            setTotalPages(res.last_page);
          } else {
            setData([]); // Jika tidak ada data, set array kosong
          }
          setLoading(false); // Set loading ke false setelah data diambil
        }
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading ke false jika terjadi error
      });

    return () => {
      isMounted = false;
    };
  }, [router.query.page]);


  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      router.push(`/prestasi?page=${page}`); // Update URL dengan query string
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
            {loading ? (
              // Tampilkan skeleton loading jika data masih loading
              <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
                <div className="col-lg-4 col-md-6 mt-30">
                  <Skeleton height={400} />
                  <Skeleton count={3} />
                </div>
              </SkeletonTheme>
            ) : // Pastikan data adalah array sebelum menggunakan map
            Array.isArray(data) && data.length > 0 ? (
              data.map((item: any) => (
                <div className="col-lg-4 col-md-6 mt-30" key={item.id}>
                  <div className="xb-coaching">
                    <div className="xb-item--inner">
                      <div className="xb-item--img">
                        <a href="#">
                          <Image
                            src={item.thumbnail || "/img/web/sertfikat.webp"} // Menggunakan thumbnail dari API
                            alt={item.nama_prestasi}
                            width={400}
                            height={400}
                          />
                        </a>
                      </div>
                      <div className="xb-item--holder pos-rel">
                        <h3 className="xb-item--title">
                          <a href="#">{item.nama_prestasi}</a>
                        </h3>
                        <p className="xb-item--content">
                          {item.tingkat} - {item.tahun} - {item.penyelenggara}
                        </p>
                        <a className="xb-item--link" href="#">
                          <Image
                            src="/img/icon/long_arrow_right.svg"
                            alt=""
                            width={20}
                            height={20}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
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
      </section>
    </>
  );
};

export default Penghargaan;
