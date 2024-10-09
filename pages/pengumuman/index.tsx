import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchDatapengumuman } from "@/apis/fetchdata";
import Scroll from "@/components/Scroll";

const Pengumuman = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  type Breadcrumb = {
    title: string;
    url?: string;
  };

  const breadcrumbData: Breadcrumb[] = [
    { title: "Home", url: "/" },
    { title: "Pengumuman" },
  ];

  useEffect(() => {
    let isMounted = true;

    // Ambil halaman dari query string jika ada
    const page = parseInt(router.query.page as string) || 1;

    setLoading(true); // Set loading to true before fetching data
    fetchDatapengumuman(page.toString())
      .then((res: any) => {
        if (isMounted) {
          setData(res.data);
          setCurrentPage(res.current_page);
          setTotalPages(res.last_page);
          setLoading(false); // Set loading to false after data is fetched
        }
      })
      .catch((error: any) => {
        console.error(error);
        setLoading(false); // Ensure loading is set to false even on error
      });

    return () => {
      isMounted = false;
    };
  }, [router.query.page]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      router.push(`/pengumuman?page=${page}`); // Update URL with query string
    }
  };

  return (
    <>
      <Head>
        <title>Pengumuman | Web Ogan Ilir</title>
      </Head>
      <Breadcrumb breadcrumbData={breadcrumbData} />
      <Scroll />

      <section className="coaching pt-130 pb-120">
        <div className="container">
          <div className="sec-title sec-title--travel text-center mb-60">
            <span className="subtitle">
              Pengumuman Kegiatan Pemerintah Kabupaten Ogan Ilir
            </span>
            <h2>Pengumuman Kegiatan</h2>
          </div>
          <div className="row">
            {loading ? (
              // Tampilkan skeleton loader sesuai jumlah data yang diambil
              [...Array(data.length || 2)].map(
                (
                  _,
                  index // Tampilkan skeleton sesuai jumlah data atau 2 jika tidak ada
                ) => (
                  <div className="col-lg-4 col-md-6 mt-30" key={index}>
                    <Skeleton height={200} />
                    <Skeleton count={2} />
                  </div>
                )
              )
            ) : data.length > 0 ? (
              data.map((item: any) => (
                <div className="col-lg-4 col-md-6 mt-30" key={item.id}>
                  <div className="xb-coaching">
                    <div className="xb-item--inner">
                      <div className="xb-item--img">
                        <a href={`/pengumuman/${item.slug}`}>
                          <Image
                            src={item.thumbnail || "/images/aplikasi_icon/oganilirbangkit.png"}
                            alt={item.title}
                            width={1250}
                            height={1000}
                          />
                        </a>
                      </div>
                      <div className="xb-item--holder pos-rel">
                        <h6 className="xb-item--title">
                          <a href={`/pengumuman/${item.slug}`}>{item.title}</a>
                        </h6>
                        <p className="xb-item--content">
                          Tanggal Upload: {item.published_at}
                        </p>
                        <a
                          className="xb-item--link"
                          type="button"
                          href={`/pengumuman/${item.slug}`}
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
              ))
            ) : (
              <p>No data available.</p>
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

export default Pengumuman;
