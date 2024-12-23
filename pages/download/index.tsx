import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import { fetchDataDownload } from "@/apis/fetchdata";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Scroll from "@/components/Scroll";
import Pagination from "@/components/Pagination"; // Import komponen Pagination
import Link from "next/link";

const Download = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // State untuk loading

  type Breadcrumb = {
    title: string;
    url?: string;
  };

  const breadcrumbData: Breadcrumb[] = [
    { title: "Home", url: "/" },
    { title: "Download" },
  ];

  useEffect(() => {
    let isMounted = true;

    // Ambil halaman dari query string jika ada
    const page = parseInt(router.query.page as string) || 1;

    setLoading(true); // Set loading ke true saat mulai fetching data
    fetchDataDownload(page.toString())
      .then((res: any) => {
        if (isMounted) {
          setData(res.data);
          setCurrentPage(res.current_page);
          setTotalPages(res.last_page);
          setLoading(false); // Set loading ke false setelah data diambil
        }
      })
      .catch((error: any) => {
        console.error(error);
        setLoading(false); // Set loading ke false jika terjadi error
      });

    return () => {
      isMounted = false;
    };
  }, [router.query.page]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      router.push(`/download?page=${page}`, undefined, { scroll: false });
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
        <title>Download | Web Ogan Ilir</title>
      </Head>
      <div>
        <Breadcrumb breadcrumbData={breadcrumbData} />
        <Scroll />

        {/* coaching start */}
        <section className="coaching pt-130 pb-120">
          <div className="container">
            <div className="sec-title sec-title--travel text-center mb-60">
              <span className="subtitle">
                File atau Dokumen yang dapat di download
              </span>
              <h2>Download File atau Dokumen</h2>
            </div>
            <section className="coaching-single pt-20 pb-130">
              <div className="container">
                <div className="row justify-content-center">
                  {loading // Tampilkan Skeleton jika loading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <div className="col-12 col-md-4 col-xl-2" key={index}>
                          <Skeleton height={150} />
                        </div>
                      ))
                    : data &&
                      data.length > 0 &&
                      data.map((item, index) => (
                        <div className="col-12 col-md-4 col-xl-2" key={index}>
                          <div className="sidebar-widget">
                            <div className="widget">
                              <div className="widget-download text-center list-unstyled">
                                <a
                                  href={item.file}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <div className="xb-download">
                                    <div className="xb-item--inner">
                                      <div className="xb-item--icon">
                                        <Image
                                          src="/images/icon/pdf.svg"
                                          alt=""
                                          width={25}
                                          height={25}
                                        />
                                      </div>
                                      <div className="xb-item--bd">
                                        <p>{item.title}</p>
                                      </div>
                                      <div className="xb-item--size">
                                        {item.size}
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </section>
          </div>
        </section>
        {/* coaching end */}
      </div>
    </>
  );
};

export default Download;
