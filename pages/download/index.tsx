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
import SearchBar from "@/components/SearchBar";

const Download = () => {
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

      const truncateHTML = (content: string, maxLength: number) => {
        const plainText = content.replace(/<\/?[^>]+(>|$)/g, "");
        return plainText.length > maxLength
          ? plainText.substring(0, maxLength) + "..."
          : plainText;
      };
    
      const breadcrumbData: Breadcrumb[] = [
        { title: "Beranda", url: "/" },
        { title: "Download" },
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
        fetchDataDownload(page.toString(), searchTerm)
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
            `/download?page=${page}${searchTerm ? `&search=${searchTerm}` : ""}`,
            undefined,
            { scroll: false }
          );
        }
      };
    
      const handleSearch = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
        setCurrentPage(1);
        router.push(
          `/download?page=1${newSearchTerm ? `&search=${newSearchTerm}` : ""}`,
          undefined,
          { scroll: false }
        );
      };
    
      const handleReset = () => {
        setSearchTerm("");
        setCurrentPage(1);
        router.push("/download?page=1", undefined, { scroll: false });
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
        <section className="coaching pt-50 ">
          <div className="container">
            <div className="sec-title sec-title--travel text-center mb-60">
              <span className="subtitle">Dokumen yang dapat di download</span>
              <h2>Download File atau Dokumen</h2>
            </div>
            <section className="coaching-single pt-20 ">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <SearchBar
                      initialSearch={search}
                      onSearch={handleSearch}
                      onReset={handleReset}
                    />
                  </div>
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
                                        <p>{truncateHTML(item.title, 50)}</p>
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
