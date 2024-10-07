import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchDataDetailFoto } from "@/apis/fetchdata";

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
      fetchDataDetailFoto(slug as string)
        .then((res: any) => {
          setPages(res.data); // Set data pages
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching detail foto:", error);
          setLoading(false);
        });
    }
  }, [slug]);

  // Display skeleton loader while loading
  if (loading) {
    return (
      <div>
        <Head>
          <title>Detail Gallery | Web Ogan Ilir</title>
        </Head>
        <Breadcrumb breadcrumbData={[]} />
        <Scroll />
        <section className="blog pt-120 pb-120">
          <div className="container">
            <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="blog-post-wrapper">
                    <article className="post-details">
                      <Skeleton height={40} width="60%" />
                      <ul className="post-meta ul_li">
                        <li>
                          <Skeleton width={100} />
                        </li>
                        <li>
                          <Skeleton width={50} />
                        </li>
                        <li>
                          <Skeleton width={80} />
                        </li>
                      </ul>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        {[...Array(3)].map((_, index) => (
                          <Skeleton key={index} height={200} width={150} />
                        ))}
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </SkeletonTheme>
          </div>
        </section>
      </div>
    );
  }

  if (!pages) return <p>Data tidak ditemukan</p>;

  type Breadcrumb = {
    title: string;
    url?: string;
  };

  const breadcrumbData: Breadcrumb[] = [
    { title: "Home", url: "/" },
    { title: "Detail Foto", url: "/foto" },
    // { title: pages.title },
  ];

  return (
    <>
      <Head>
        <title>Detail Gallery | Web Ogan Ilir</title>
      </Head>
      <div>
        <Breadcrumb breadcrumbData={breadcrumbData} />
        <Scroll />

        <section className="blog pt-120 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="blog-post-wrapper">
                  <article className="post-details">
                    <h1>
                      <h2 className="post-title">{pages.title}</h2>
                      <ul className="post-meta ul_li">
                        <li>
                          <i className="fal fa-calendar-alt" />
                          <span>{pages.created_at}</span>
                        </li>
                        <li>
                          <i className="fal fa-user" />
                          <span>By {pages.author}</span>
                        </li>
                        {/* views */}
                        <li>
                          <i className="fal fa-eye" />
                          <span>Views: {pages.views}</span>
                        </li>
                      </ul>
                    </h1>
                    <p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        {pages.photos.map((photo: any, index: number) => (
                          <div key={index}>
                            <Image
                              src={photo.image}
                              alt={photo.title}
                              width={500}
                              height={644}
                            />
                          </div>
                        ))}
                      </div>
                    </p>
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
