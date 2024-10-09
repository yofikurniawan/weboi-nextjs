// Desc: Footer component
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchDataIdentity } from "@/apis/fetchdata";
import Link from "next/link";

const Footer = () => {

  const [identity, setIdentity] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true saat fetching data
      try {
        const res = await fetchDataIdentity();
        if (res && res.success && res.data) {
          setIdentity(res.data); // Mengambil data dari objek data
          setErrorMessage(""); // Reset error message jika data ditemukan
        } else {
          setErrorMessage("Data identitas tidak ditemukan.");
        }
      } catch (error) {
        setErrorMessage("Gagal memuat data identitas.");
      } finally {
        setLoading(false); // Set loading ke false setelah fetching
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="site-footer gray-bg footer__copyright mt-50 pt-90">
      <div className="container">
        <div className="row mt-none-30 pb-60">
          <div className="col-lg-2 mt-30 col-md-6 footer__custom-col">
            <div className="footer__widget">
              <h3 className="widget-title">Kontak Informasi :</h3>
              <ul className="footer__cta list-unstyled mt-50">
                <li className="ul_li">
                  <span>
                    <Image
                      src="/images/footer/icon/f_call.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  </span>
                  <a href="#" className="text-dark">
                    WA Center
                  </a>
                </li>
                <li className="ul_li">
                  <span>
                    <Image
                      src="/images/footer/icon/f_mail.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  </span>
                  <a href={`mailto:${identity.email}`} className="text-dark">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 mt-30 col-md-6 footer__custom-col">
            <div className="footer__widget">
              <h3 className="widget-title">Profil Ogan Ilir</h3>
              <ul className="footer__links list-unstyled">
                <li>
                  <Link href="/pages/tentang-ogan-ilir">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={13}
                        height={13}
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                          fill="#B1B4BA"
                        />
                      </svg>
                    </span>
                    Tentang
                  </Link>
                </li>
                <li>
                  <Link href="/kepala-daerah">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={13}
                        height={13}
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                          fill="#B1B4BA"
                        />
                      </svg>
                    </span>
                    Kepala Daerah
                  </Link>
                </li>
                <li>
                  <a href="#!">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={13}
                        height={13}
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                          fill="#B1B4BA"
                        />
                      </svg>
                    </span>
                    Struktur Organisasi
                  </a>
                </li>
                <li>
                  <Link href="/penghargaan">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={13}
                        height={13}
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                          fill="#B1B4BA"
                        />
                      </svg>
                    </span>
                    Penghargaan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 mt-30 col-md-6 footer__custom-col">
            <div className="footer__widget">
              <h3 className="widget-title">Layanan Publik</h3>
              <ul className="footer__links list-unstyled">
                <li>
                  <a href="#!">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={13}
                        height={13}
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                          fill="#B1B4BA"
                        />
                      </svg>
                    </span>
                    Lapor
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={13}
                        height={13}
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                          fill="#B1B4BA"
                        />
                      </svg>
                    </span>
                    Satu Data
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={13}
                        height={13}
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                          fill="#B1B4BA"
                        />
                      </svg>
                    </span>
                    JDIH
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={13}
                        height={13}
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M6.5 0C6.72067 3.49437 9.5056 6.27934 13 6.5C9.5056 6.72067 6.72067 9.5056 6.5 13C6.27934 9.5056 3.49437 6.72067 0 6.5C3.49437 6.27934 6.27934 3.49437 6.5 0Z"
                          fill="#B1B4BA"
                        />
                      </svg>
                    </span>
                    PPID
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 mt-30 col-md-6 footer__custom-col">
            <div className="footer__widget">
              <h3
                className="widget-title"
                data-asw-orgfontsize={20}
                style={{ fontSize: 20 }}
              >
                <i className="fa fa-chart-line me-1" /> Statistik Pengunjung
              </h3>
              <div className="table table-responsive">
                <table>
                  <tbody>
                    <tr
                      style={{ border: "none", backgroundColor: "transparent" }}
                    >
                      <td data-asw-orgfontsize={14} style={{ fontSize: 14 }}>
                        <span
                          className="text-muted"
                          style={{ fontSize: 12 }}
                          data-asw-orgfontsize={12}
                        >
                          <i className="fa fa-users me-1" />
                          Pengunjung hari ini
                        </span>
                      </td>
                      <td data-asw-orgfontsize={14} style={{ fontSize: 14 }}>
                        <span
                          className="text-white badge bg-primary"
                          style={{ fontSize: 12 }}
                          data-asw-orgfontsize={12}
                        >
                          657
                        </span>
                      </td>
                    </tr>
                    <tr
                      style={{ border: "none", backgroundColor: "transparent" }}
                    >
                      <td data-asw-orgfontsize={14} style={{ fontSize: 14 }}>
                        <span
                          className="text-muted"
                          style={{ fontSize: 12 }}
                          data-asw-orgfontsize={12}
                        >
                          <i className="fa fa-users me-1" />
                          Pengunjung minggu ini
                        </span>
                      </td>
                      <td data-asw-orgfontsize={14} style={{ fontSize: 14 }}>
                        <span
                          className="text-white badge bg-primary"
                          style={{ fontSize: 12 }}
                          data-asw-orgfontsize={12}
                        >
                          1.657
                        </span>
                      </td>
                    </tr>
                    <tr
                      style={{ border: "none", backgroundColor: "transparent" }}
                    >
                      <td data-asw-orgfontsize={14} style={{ fontSize: 14 }}>
                        <span
                          className="text-muted"
                          style={{ fontSize: 12 }}
                          data-asw-orgfontsize={12}
                        >
                          <i className="fa fa-users me-1" />
                          Pengunjung Bulan ini
                        </span>
                      </td>
                      <td data-asw-orgfontsize={14} style={{ fontSize: 14 }}>
                        <span
                          className="text-white badge bg-primary"
                          style={{ fontSize: 12 }}
                          data-asw-orgfontsize={12}
                        >
                          3.657
                        </span>
                      </td>
                    </tr>
                    <tr
                      style={{ border: "none", backgroundColor: "transparent" }}
                    >
                      <td data-asw-orgfontsize={14} style={{ fontSize: 14 }}>
                        <span
                          className="text-muted"
                          style={{ fontSize: 12 }}
                          data-asw-orgfontsize={12}
                        >
                          <i className="fa fa-users me-1" />
                          Pengunjung Tahun ini
                        </span>
                      </td>
                      <td data-asw-orgfontsize={14} style={{ fontSize: 14 }}>
                        <span
                          className="text-white badge bg-primary"
                          style={{ fontSize: 12 }}
                          data-asw-orgfontsize={12}
                        >
                          23.657
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__copyrightst ul_li_between ft_bg">
          <div className="footer__copyright-text mt-15">
            Copyright © 2024 Developed by Diskominfo Ogan Ilir All rights
            reserved.
          </div>
          <div className="mt-20">
            <Image
              src="/images/aplikasi_icon/lisensi.png"
              style={{ height: "30px !important" }}
              alt=""
              width={100}
              height={100}
            />
            <Image
              src="/images/aplikasi_icon/oganilirbangkit.png"
              style={{ height: "30px !important", marginLeft: 10 }}
              alt=""
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

