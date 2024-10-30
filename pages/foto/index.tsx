import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchDataFoto } from "@/apis/fetchdata";
import Skeleton from "react-loading-skeleton"; // Import Skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import CSS Skeleton
import Scroll from "@/components/Scroll";

const Foto = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState<boolean>(true); // State loading

  type Breadcrumb = {
    title: string;
    url?: string;
  };

  const breadcrumbData: Breadcrumb[] = [
    { title: "Home", url: "/" },
    { title: "Gallery" },
  ];

  useEffect(() => {
    let isMounted = true;

    // Ambil halaman dari query string jika ada
    const page = parseInt(router.query.page as string) || 1;

    setLoading(true); // Set loading true sebelum fetch data
    fetchDataFoto(page.toString())
      .then((res: any) => {
        if (isMounted) {
          setData(res.data);
          console.log(res);
          setCurrentPage(res.current_page);
          setTotalPages(res.last_page);
          setLoading(false); // Set loading false setelah data diambil
        }
      })
      .catch((error: any) => {
        console.error(error);
        setLoading(false); // Set loading false jika ada error
      });

    return () => {
      isMounted = false;
    };
  }, [router.query.page]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      router.push(`/foto?page=${page}`, undefined, { scroll: false });
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
        <title>Foto | Web Ogan Ilir</title>
      </Head>

      <Breadcrumb breadcrumbData={breadcrumbData} />
      <Scroll />

      <section className="coaching pt-130 pb-120">
        <div className="container">
          <div className="sec-title sec-title--travel text-center mb-60">
            <span className="subtitle">
              Dokumentasi Kegiatan Pemerintah Kabupaten Ogan Ilir
            </span>
            <h2>Dokumentasi Kegiatan</h2>
          </div>
          <div className="row">
            {loading ? ( // Tampilkan Skeleton jika loading
              [...Array(data.length || 6)].map(
                (
                  _,
                  index // Tampilkan 6 skeleton
                ) => (
                  <div className="col-lg-4 col-md-6 mt-30" key={index}>
                    <Skeleton height={250} />{" "}
                    {/* Atur tinggi sesuai kebutuhan */}
                  </div>
                )
              )
            ) : data && data.length > 0 ? (
              data.map((item: any) => (
                <>
                  <div className="col-lg-4 col-md-6 mt-30" key={item.id}>
                    <div className="xb-coaching">
                      <div className="xb-item--inner">
                        <div className="xb-item--img">
                          <a href={`/foto/${item.slug}`}>
                            <Image
                              style={{
                                borderRadius: "10px",
                                height: "350px",
                                objectFit: "cover",
                              }}
                              src={item.thumbnail || "/img/web/img/default.jpg"}
                              alt={item.title}
                              width={1250}
                              height={1000}
                            />
                          </a>
                        </div>
                        <div className="xb-item--holder pos-rel">
                          <h6 className="xb-item--title">
                            <a href={`/foto/${item.slug}`}>{item.title}</a>
                          </h6>
                          <p className="xb-item--content">{item.title}</p>
                          <a
                            className="xb-item--link"
                            type="button"
                            href={`/foto/${item.slug}`}
                          >
                            <Image
                              src="/images/icon/long_arrow_right.svg"
                              alt="Selengkapnya"
                              width={15}
                              height={10}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <p>Data tidak ditemukan</p>
            )}

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
                {renderPagination()}
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
      {/* coaching end */}
    </>
  );
};

export default Foto;
