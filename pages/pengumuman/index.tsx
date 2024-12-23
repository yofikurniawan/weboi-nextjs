import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchDatapengumuman } from "@/apis/fetchdata";
import Scroll from "@/components/Scroll";
import Pagination from "@/components/Pagination"; // Import komponen Pagination
import Link from "next/link";

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

    // Get page from query string if available
    const page = parseInt(router.query.page as string) || 1;

    setLoading(true);
    fetchDatapengumuman(page.toString())
      .then((res: any) => {
        if (isMounted) {
          setData(res.data);
          setCurrentPage(res.current_page);
          setTotalPages(res.last_page);
          setLoading(false);
        }
      })
      .catch((error: any) => {
        console.error(error);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [router.query.page]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      router.push(`/pengumuman?page=${page}`, undefined, { scroll: false });
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
              [...Array((data && data.length) || 6)].map((_, index) => (
                <div className="col-lg-4 col-md-6 mt-30" key={index}>
                  <Skeleton height={200} />
                  <Skeleton count={6} />
                </div>
              ))
            ) : data && data.length > 0 ? (
              data.map((item: any) => (
                <div className="col-lg-4 col-md-6 mt-30" key={item.id}>
                  <div className="xb-coaching">
                    <div className="xb-item--inner">
                      <div className="xb-item--img">
                        <Link href={`/pengumuman/${item.slug}`}>
                          <Image
                            src={
                              item.thumbnail ||
                              "/images/aplikasi_icon/oganilirbangkit.png"
                            }
                            alt={item.title}
                            width={1250}
                            height={1000}
                          />
                        </Link>
                      </div>
                      <div className="xb-item--holder pos-rel">
                        <h6 className="xb-item--title">
                          <Link href={`/pengumuman/${item.slug}`}>
                            {item.title}
                          </Link>
                        </h6>
                        <p className="xb-item--content">
                          Tanggal Upload: {item.published_at}
                        </p>
                        <Link
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
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Data tidak ditemukan</p>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Pengumuman;
