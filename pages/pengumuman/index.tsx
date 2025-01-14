import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchDatapengumuman } from "@/apis/fetchdata";
import Scroll from "@/components/Scroll";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

const Pengumuman = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  type Breadcrumb = {
    title: string;
    url?: string;
  };

  const breadcrumbData: Breadcrumb[] = [
    { title: "Beranda", url: "/" },
    { title: "Pengumuman" },
  ];

  const page = parseInt(router.query.page as string) || 1;
  const search = (router.query.search as string) || "";

  useEffect(() => {
    if (router.query.search) {
      setSearchTerm(router.query.search as string);
    }
  }, [router.query.search]);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    fetchDatapengumuman(page.toString(), searchTerm)
      .then((res: any) => {
        if (isMounted) {
          setData(Array.isArray(res.data) ? res.data : []);
          setCurrentPage(res.current_page);
          setTotalPages(res.last_page);
          setLoading(false);
        }
      })
      .catch((error: any) => {
        console.error(error);
        if (isMounted) {
          setData([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [page, searchTerm]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      router.push(
        `/pengumuman?page=${page}${searchTerm ? `&search=${searchTerm}` : ""}`,
        undefined,
        { scroll: false }
      );
    }
  };

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
    router.push(
      `/pengumuman?page=1${newSearchTerm ? `&search=${newSearchTerm}` : ""}`,
      undefined,
      { scroll: false }
    );
  };

  const handleReset = () => {
    setSearchTerm("");
    setCurrentPage(1);
    router.push("/pengumuman?page=1", undefined, { scroll: false });
  };

  return (
    <>
      <Head>
        <title>Pengumuman | Web Ogan Ilir</title>
      </Head>
      <Breadcrumb breadcrumbData={breadcrumbData} />
      <Scroll />

      <section className="coaching pt-50">
        <div className="container">
          <div className="sec-title sec-title--travel text-center mb-60">
            <span className="subtitle">
              Pengumuman Kegiatan Pemerintah Kabupaten Ogan Ilir
            </span>
            <h2>Pengumuman Kegiatan</h2>
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <SearchBar
                initialSearch={search}
                onSearch={handleSearch}
                onReset={handleReset}
              />
            </div>
          </div>

          <div className="row">
            {loading ? (
              [...Array(6)].map((_, index) => (
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
              <div className="col-12 text-center mt-4">
                <p>Data tidak ditemukan</p>
              </div>
            )}
          </div>

          {data && data.length > 0 && (
            <div className="row mt-4">
              <div className="col-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Pengumuman;
