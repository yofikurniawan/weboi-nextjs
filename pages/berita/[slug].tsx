import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  fetchDataDetailBerita,
  fetchDataBeritaPopuler,
  fetchDataCategoryArticle,
} from "@/apis/fetchdata";
import Scroll from "@/components/Scroll";
import Link from "next/link";

const DetailBerita = ({}: any) => {
  const router = useRouter();
  const { slug } = router.query;
  const [populer, setDataPopuler] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [berita, setBerita] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [populerError, setPopulerError] = useState<boolean>(false);
  const [categoryError, setCategoryError] = useState<boolean>(false);

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      setError(null);
      fetchDataDetailBerita(slug as string)
        .then((res: any) => {
          setBerita(res.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(
            "Terjadi kesalahan saat memuat berita. Silakan coba lagi nanti."
          );
          setLoading(false);
        });
    }
  }, [slug]);

  useEffect(() => {
    fetchDataBeritaPopuler()
      .then((res: any) => {
        setDataPopuler(res.data);
        setPopulerError(false);
      })
      .catch(() => {
        setPopulerError(true);
      });
  }, []);

  useEffect(() => {
    fetchDataCategoryArticle()
      .then((res: any) => {
        setCategory(res.data);
        setCategoryError(false);
      })
      .catch(() => {
        setCategoryError(true);
      });
  }, []);

  const breadcrumbData = [
    { title: "Beranda", url: "/" },
    { title: "Berita", url: "/berita" },
    { title: "Detail Berita" },
  ];

  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="alert alert-warning" role="alert">
      {message}
    </div>
  );

  return (
    <>
      <Head>
        <title>Detail Berita | Web Ogan Ilir</title>
      </Head>
      <Scroll />
      <div>
        <Breadcrumb breadcrumbData={breadcrumbData} />

        <section className="blog pt-120 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="blog-post-wrapper">
                  <article className="post-details">
                    {loading ? (
                      <SkeletonTheme
                        baseColor="#e0e0e0"
                        highlightColor="#f0f0f0"
                      >
                        <Skeleton height={200} />
                        <Skeleton height={30} count={3} />
                      </SkeletonTheme>
                    ) : error ? (
                      <ErrorMessage message={error} />
                    ) : berita ? (
                      <>
                        <div className="post-thumb">
                          <Image
                            src={berita.thumbnail}
                            alt={berita.title}
                            width={1215}
                            height={644}
                          />
                        </div>
                        <ul className="post-meta ul_li">
                          <li>
                            <span>
                              <i className="far fa-user" />
                              <span className="author vcard">
                                {berita.author}
                              </span>
                            </span>
                          </li>
                          <li>
                            <a href="#!">
                              <i className="far fa-eye" /> {berita.views} views
                            </a>
                          </li>
                          <li>
                            <span className="posted-on">
                              <i className="far fa-calendar-check" />{" "}
                              <a href="#!">{berita.published_at}</a>
                            </span>
                          </li>
                        </ul>
                        <h2>{berita.title}</h2>
                        <p
                          dangerouslySetInnerHTML={{ __html: berita.content }}
                        />
                      </>
                    ) : (
                      <ErrorMessage message="Error saat memuat berita" />
                    )}
                  </article>

                  {!error && berita && (
                    <div className="post-footer mt-10 mb-40 ul_li_between">
                      <div className="post-tags ul_li mt-20">
                        <h5 className="tag-title">Tags:</h5>
                        <span className="tags-links">
                          {loading ? (
                            <SkeletonTheme
                              baseColor="#e0e0e0"
                              highlightColor="#f0f0f0"
                            >
                              <Skeleton width={100} height={20} count={3} />
                            </SkeletonTheme>
                          ) : berita.tags && berita.tags.length > 0 ? (
                            berita.tags.map(
                              (tag: { id: number; name: string }) => (
                                <a key={tag.id} href="#!" rel="tag">
                                  {tag.name}
                                </a>
                              )
                            )
                          ) : (
                            <p>No tags available.</p>
                          )}
                        </span>
                      </div>

                      <div className="social-share ul_li mt-20">
                        <h5 className="title">Share:</h5>
                        <ul className="post-share ul_li">
                          <li>
                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                currentUrl
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fab fa-facebook-f" />
                            </a>
                          </li>
                          <li>
                            <a
                              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                                berita.title
                              )}%20${encodeURIComponent(currentUrl)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fab fa-whatsapp" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="blog-sidebar">
                  <div className="widget">
                    <h3 className="widget-title">Berita Populer</h3>
                    <div className="widget__post">
                      {loading ? (
                        <SkeletonTheme
                          baseColor="#e0e0e0"
                          highlightColor="#f0f0f0"
                        >
                          <Skeleton height={120} count={3} />
                        </SkeletonTheme>
                      ) : populerError ? (
                        <ErrorMessage message="Gagal memuat berita populer" />
                      ) : populer && populer.length > 0 ? (
                        populer.map((item, index) => (
                          <div
                            key={index}
                            className="widget__post-item ul_li_wg_berita"
                          >
                            <div className="post-thumb">
                              <Link href={`/berita/${item.slug}`}>
                                <Image
                                  src={item.thumbnail}
                                  alt={item.title}
                                  width={120}
                                  height={120}
                                />
                              </Link>
                            </div>
                            <div className="post-content">
                              <span className="post-dates">
                                {item.published_at}
                              </span>
                              <h4 className="post-titles border-effect-2">
                                <Link href={`/berita/${item.slug}`}>
                                  {item.title}
                                </Link>
                              </h4>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Tidak ada berita populer</p>
                      )}
                    </div>
                  </div>

                  <div className="widget">
                    <h3 className="widget-title">Kategori</h3>
                    <ul className="widget__category list-unstyled">
                      {loading ? (
                        <SkeletonTheme
                          baseColor="#e0e0e0"
                          highlightColor="#f0f0f0"
                        >
                          <Skeleton height={20} count={3} />
                        </SkeletonTheme>
                      ) : categoryError ? (
                        <ErrorMessage message="Gagal memuat kategori" />
                      ) : category && category.length > 0 ? (
                        category.map((item, index) => (
                          <li key={index}>
                            <a href={`/berita?category=${item.id}`}>
                              {item.name}
                            </a>
                          </li>
                        ))
                      ) : (
                        <p>Tidak ada kategori</p>
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

export default DetailBerita;
