import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchDataVideo } from "@/apis/fetchdata";

import Skeleton from "react-loading-skeleton"; // Import Skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import CSS Skeleton
import Scroll from "@/components/Scroll";
import Pagination from "@/components/Pagination"; // Import komponen Pagination
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

const Video = () => {
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
      { title: "Video" },
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
      fetchDataVideo(page.toString(), searchTerm)
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
          `/video?page=${page}${searchTerm ? `&search=${searchTerm}` : ""}`,
          undefined,
          { scroll: false }
        );
      }
    };
  
    const handleSearch = (newSearchTerm: string) => {
      setSearchTerm(newSearchTerm);
      setCurrentPage(1);
      router.push(
        `/video?page=1${newSearchTerm ? `&search=${newSearchTerm}` : ""}`,
        undefined,
        { scroll: false }
      );
    };
  
    const handleReset = () => {
      setSearchTerm("");
      setCurrentPage(1);
      router.push("/video?page=1", undefined, { scroll: false });
    };

  return (
    <>
      <Head>
        <title>Video | Web Ogan Ilir</title>
      </Head>
      <div>
        <Breadcrumb breadcrumbData={breadcrumbData} />
        <Scroll />

        {/* coaching start */}
        <section className="coaching pt-50 ">
          <div className="container">
            <div className="sec-title sec-title--travel text-center mb-60">
              <span className="subtitle">
                Dokumentasi Kegiatan Pemerintah Kabupaten Ogan Ilir
              </span>
              <h2>Dokumentasi Kegiatan</h2>
            </div>
            <div className="row">
              <div className="col-12">
                <SearchBar
                  initialSearch={search}
                  onSearch={handleSearch}
                  onReset={handleReset}
                />
              </div>
              {loading ? ( // Tampilkan skeleton saat loading
                [...Array((data && data.length) || 6)].map(
                  (
                    _,
                    index // Menampilkan 6 skeleton
                  ) => (
                    <div className="col-lg-4 col-md-6 mt-30" key={index}>
                      <Skeleton height={415} />
                    </div>
                  )
                )
              ) : data && data.length > 0 ? (
                data.map((item, index) => (
                  <div className="col-lg-4 col-md-6 mt-30" key={index}>
                    <div className="xb-coaching">
                      <div className="xb-item--inner">
                        <div className="xb-item--img">
                          <Image
                            src={`https://img.youtube.com/vi/${item.link}/hqdefault.jpg`}
                            alt={item.title}
                            width={500}
                            height={715}
                          />
                        </div>
                        <div className="xb-item--holder pos-rel">
                          <h6 className="xb-item--title">
                            <Link href={`/video/${item.slug}`}>
                              {item.title}
                            </Link>
                          </h6>
                          <p className="xb-item--content">{item.description}</p>
                          <a className="xb-item--link" type="button" href="#">
                            <i className="fab fa-youtube text-white" />
                          </a>
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
        {/* coaching end */}
      </div>
    </>
  );
};

export default Video;