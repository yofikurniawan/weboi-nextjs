import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchDataDetailVideo } from "@/apis/fetchdata";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Scroll from "@/components/Scroll";

const DetailVideo = ({}: any) => {
  const router = useRouter();
  const { slug } = router.query; // Ambil slug dari URL
  const [pages, setPages] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // Fetch detail berita berdasarkan slug
      fetchDataDetailVideo(slug as string)
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

  if (loading) {
    return (
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
        <p>
          <Skeleton height={30} width="50%" />
        </p>
        <Skeleton height={400} />
        <Skeleton count={3} />
      </SkeletonTheme>
    );
  }

  if (!pages) return <p>Data tidak ditemukan</p>;

  type Breadcrumb = {
    title: string;
    url?: string;
  };

  const breadcrumbData: Breadcrumb[] = [
    { title: "Home", url: "/" },
    { title: "Video", url: "/video" },
    { title: pages.title },
  ];

  return (
    <>
      <Head>
        <title>Detail Video | Web Ogan Ilir</title>
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
                          <i className="fal fa-eye" />
                          <span>Views: {pages.views}</span>
                        </li>
                      </ul>
                    </h1>
                    <p>
                      <iframe
                        className="w-full"
                        style={{ width: "100%", height: 700 }}
                        src={`https://www.youtube.com/embed/${pages.link}`} // Use template literals
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        frameBorder="0"
                      />
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

export default DetailVideo;
