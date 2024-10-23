import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  fetchDataPages,
  fetchDataBeritaPopuler,
  fetchDataCategoryArticle,
} from "@/apis/fetchdata";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Scroll from "@/components/Scroll";

const DetailPages = ({}: any) => {
  const router = useRouter();
  const { slug } = router.query; // Ambil slug dari URL

  const [populer, setDataPopuler] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [pages, setPages] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // Fetch detail berita berdasarkan slug
      fetchDataPages(slug as string)
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

  useEffect(() => {
    fetchDataBeritaPopuler()
      .then((res: any) => {
        setDataPopuler(res.data);
        // console.log(res);
      })
      .catch((error: any) => {
        // console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchDataCategoryArticle()
      .then((res: any) => {
        setCategory(res.data);
        console.log(res);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  // Periksa loading terlebih dahulu
  if (loading) {
    return (
      <div className="container">
        <Skeleton count={1} height={40} /> {/* Skeleton untuk judul */}
        <Skeleton count={1} height={20} /> {/* Skeleton untuk tanggal */}
        <Skeleton count={3} height={15} /> {/* Skeleton untuk konten */}
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
    { title: pages.title },
  ];

  return (
    <>
      <Head>
        <title>Detail Pages | Web Ogan Ilir</title>
      </Head>
      <div>
        <Breadcrumb breadcrumbData={breadcrumbData} />
        <Scroll />
        <div className="xb-backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
          </a>
        </div>

        <section className="blog pt-120 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
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
                        <span>By Admin</span>
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

              <div className="col-lg-4">
                <div className="blog-sidebar">
                  <div className="widget">
                    <h3 className="widget-title">Berita Populer</h3>
                    <div className="widget__post">
                      {loading ? (
                        // Skeleton untuk berita populer
                        <>
                          {Array.from({ length: 3 }).map((_, index) => (
                            <div
                              key={index}
                              className="widget__post-item ul_li"
                            >
                              <Skeleton width={200} height={100} />
                              <div className="post-content">
                                <Skeleton width={`60%`} height={15} />
                                <Skeleton width={`90%`} height={15} />
                              </div>
                            </div>
                          ))}
                        </>
                      ) : populer && populer.length > 0 ? (
                        populer.map((item, index) => (
                          <div key={index} className="widget__post-item ul_li">
                            <div className="post-thumb">
                              <a href="blog-single.html">
                                <Image
                                  src={item.thumbnail}
                                  alt=""
                                  width={200}
                                  height={100}
                                />
                              </a>
                            </div>
                            <div className="post-content">
                              <span className="post-date">
                                {item.published_at}
                              </span>
                              <h4 className="post-title border-effect-2">
                                <a href={`/pages/${item.slug}`}>{item.title}</a>
                              </h4>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No popular news available.</p>
                      )}
                    </div>
                  </div>

                  <div className="widget">
                    <h3 className="widget-title">Kategori</h3>
                    <ul className="widget__category list-unstyled">
                      {loading ? (
                        // Skeleton untuk kategori
                        <>
                          {Array.from({ length: 3 }).map((_, index) => (
                            <li key={index}>
                              <Skeleton width={`70%`} height={15} />
                            </li>
                          ))}
                        </>
                      ) : category && category.length > 0 ? (
                        category.map((item, index) => (
                          <li key={index}>
                            <i className="far fa-arrow-up" /> {item.name}
                          </li>
                        ))
                      ) : (
                        <p>No categories available.</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailPages;
