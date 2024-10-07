import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchDataDetailPengumuman } from "@/apis/fetchdata";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Scroll from "@/components/Scroll";

const DetailPengumuman = ({}: any) => {
  const router = useRouter();
  const { slug } = router.query; // Ambil slug dari URL
  const [pages, setPages] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // Fetch detail berita berdasarkan slug
      fetchDataDetailPengumuman(slug as string)
        .then((res: any) => {
          setPages(res.data); // Set data pages
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching detail pages:", error);
          setLoading(false);
        });
    }
  }, [slug]);

  // Jika loading, tampilkan skeleton
  if (loading) {
    return (
      <div>
        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
          <Breadcrumb breadcrumbData={[]} />
          <section className="blog pt-120 pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="blog-post-wrapper">
                    <article className="post-details">
                      <Skeleton height={40} width="80%" />
                      <ul className="post-meta ul_li">
                        <li>
                          <Skeleton height={20} width={100} />
                        </li>
                        <li>
                          <Skeleton height={20} width={100} />
                        </li>
                        <li>
                          <Skeleton height={20} width={100} />
                        </li>
                      </ul>
                      <Skeleton count={5} />
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SkeletonTheme>
      </div>
    );
  }

  // Jika tidak ada data
  if (!pages) return <p>Data tidak ditemukan</p>;

  type Breadcrumb = {
    title: string;
    url?: string;
  };

  const breadcrumbData: Breadcrumb[] = [
    { title: "Home", url: "/" },
    { title: "Pengumuman", url: "/pengumuman" },
    { title: pages.title },
  ];

  return (
    <>
      <Head>
        <title>Detail Pengumuman | Web Ogan Ilir</title>
      </Head>
      <Scroll />
      <div>
        <Breadcrumb breadcrumbData={breadcrumbData} />

        <section className="blog pt-120 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="blog-post-wrapper">
                  <article className="post-details">
                    <h2 className="post-title">{pages.title}</h2>
                    <ul className="post-meta ul_li">
                      <li>
                        <i className="fal fa-calendar-alt" />
                        <span>{pages.published_at}</span>
                      </li>
                      <li>
                        <i className="fal fa-user" />
                        <span>By {pages.author}</span>
                      </li>
                      <li>
                        <i className="fal fa-eye" />
                        <span>Views: {pages.views}</span>
                      </li>
                    </ul>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: pages.content,
                      }}
                    />
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailPengumuman;
