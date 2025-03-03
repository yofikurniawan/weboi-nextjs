import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import {
  fetchDataAkuntabilitas,
  fetchDataCategoryAkuntabilitas,
} from "@/apis/fetchdata";
import ErrorHandler from "../../components/ErrorHandler";

const Akuntabilitas = () => {
  const [category, setCategory] = useState<any[]>([]);
  const [akuntabilitas, setAkuntabilitas] = useState<any[]>([]); // Inisialisasi sebagai array
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Default kategori
  const [selectedTahun, setSelectedTahun] = useState<string>("2025"); // Default tahun
  const [loading, setLoading] = useState<boolean>(false); // Indikator loading
  const [errorMessage, setErrorMessage] = useState<string>(""); // Pesan error jika data tidak ada
  const [layout, setLayout] = useState<"list" | "grid">("list"); // State untuk tata letak

  type Breadcrumb = {
    title: string;
    url?: string;
  };

  const breadcrumbData: Breadcrumb[] = [
    { title: "Beranda", url: "/" },
    { title: "Akuntabilitas" },
  ];

  // Mengambil kategori akuntabilitas
  useEffect(() => {
    fetchDataCategoryAkuntabilitas()
      .then((res: any) => {
        setCategory(res.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Reset pesan error setiap kali fetch data
    setErrorMessage("");

    // Cek jika selectedCategory belum dipilih
    if (!selectedCategory) {
      setErrorMessage("Pilih kategori akuntabilitas terlebih dahulu.");
      setAkuntabilitas([]); // Pastikan data kosong jika kategori belum dipilih
      setLoading(false); // Set loading ke false karena tidak melakukan fetch data
      return;
    }

    setLoading(true);
    fetchDataAkuntabilitas(selectedCategory, selectedTahun)
      .then((res: any) => {
        if (res.data && res.data.length > 0) {
          setAkuntabilitas(res.data); // Menyimpan data sebagai array
        } else {
          setAkuntabilitas([]); // Jika tidak ada data, set menjadi array kosong
          setErrorMessage("Data Akuntabilitas tidak ditemukan.");
        }
      })
      .catch((error: any) => {
        console.error(error);
        setErrorMessage("Terjadi kesalahan saat mengambil data.");
      })
      .finally(() => setLoading(false));
  }, [selectedCategory, selectedTahun]); // Memicu fetch data saat kategori atau tahun berubah

  // Fungsi untuk memilih kategori
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId); // Mengubah kategori
  };

  // Fungsi untuk memilih tahun
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTahun(event.target.value); // Mengubah tahun
  };

  return (
    <>
      <Head>
        <title>Akuntabilitas | Web Ogan Ilir</title>
      </Head>

      <div>
        <Breadcrumb breadcrumbData={breadcrumbData} />

        {/* coaching single start */}
        <section className="coaching-single pt-50 pb-10">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="sidebar-widget">
                  <div className="widget">
                    <ul
                      className="widget-category country-widget list-unstyled"
                      id="myTab"
                      role="tablist"
                    >
                      {category?.map((item, index) => (
                        <li
                          key={index}
                          className="nav-item"
                          role="presentation"
                        >
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault(); // Mencegah default behavior (scroll ke atas)
                              handleCategoryClick(item.id);
                            }}
                            className={`nav-link ${
                              selectedCategory === item.id ? "active" : ""
                            }`}
                            id={`xbc-${item.id}`}
                            type="button"
                            role="tab"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="d-flex"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 30,
                    }}
                  >
                    <div className="title">
                      <h4>Dokumen Akuntabilitas</h4>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="header__language me-3">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          style={{
                            backgroundColor: "#FFA33C",
                            border: "none",
                          }}
                          onChange={handleYearChange}
                          value={selectedTahun}
                        >
                          <option value="">Silahkan Pilih Tahun</option>
                          {Array.from(
                            { length: new Date().getFullYear() - 2021 + 6 },
                            (_, i) => (
                              <option key={i} value={2021 + i}>
                                {2021 + i}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <button
                          className={`btn btn-sm me-2 ${
                            layout === "list"
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => setLayout("list")}
                        >
                          <i className="bi bi-list-ul"></i> List
                        </button>
                        <button
                          className={`btn btn-sm ${
                            layout === "grid"
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => setLayout("grid")}
                        >
                          <i className="bi bi-grid"></i> Grid
                        </button>
                      </div>
                    </div>
                  </div>

                  {loading ? (
                    <p>Loading...</p>
                  ) : akuntabilitas.length === 1 ? (
                    // Jika data hanya 1, tampilkan dalam tata letak detail
                    <div className="col-12">
                      <div className="tab-pane animated fadeInUp show active">
                        <div className="row card-item">
                          <div className="col-12 col-lg-4">
                            <Image
                              style={{
                                cursor: "pointer",
                                marginBottom: 20,
                                border: "1px solid #000000",
                                borderRadius: 5,
                              }}
                              src={akuntabilitas[0].thumbnail}
                              alt=""
                              width={300}
                              height={450}
                            />
                          </div>
                          <div
                            className="col-12 col-lg-8"
                            style={{ padding: 20 }}
                          >
                            <table
                              className="table table-striped"
                              style={{ width: "100%" }}
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      width: "20%",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    Nama File
                                  </td>
                                  <td style={{ verticalAlign: "top" }}>:</td>
                                  <td>{akuntabilitas[0].name}</td>
                                </tr>
                                <tr>
                                  <td>Dokumen tahun</td>
                                  <td>:</td>
                                  <td>{akuntabilitas[0].tahun}</td>
                                </tr>
                                <tr>
                                  <td style={{ verticalAlign: "top" }}>
                                    Tanggal Upload
                                  </td>
                                  <td style={{ verticalAlign: "top" }}>:</td>
                                  <td style={{ verticalAlign: "top" }}>
                                    {akuntabilitas[0].published_at}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="xb-item--btn mt-20 mb-3">
                              {akuntabilitas[0].file ? (
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => {
                                    if (akuntabilitas[0].type == "file") {
                                      const link = document.createElement("a");
                                      link.target = "_blank";
                                      link.href = akuntabilitas[0].file;
                                      link.download = akuntabilitas[0].file;
                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);
                                    } else if (
                                      akuntabilitas[0].type == "link"
                                    ) {
                                      window.open(
                                        akuntabilitas[0].file,
                                        "_blank"
                                      );
                                    }
                                  }}
                                >
                                  {akuntabilitas[0].type == "file"
                                    ? "Unduh Dokumen"
                                    : "Buka Link"}
                                </button>
                              ) : (
                                <p>Dokumen tidak tersedia</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : akuntabilitas.length > 1 ? (
                    // Jika data lebih dari 1, tampilkan sesuai tata letak yang dipilih
                    layout === "list" ? (
                      // Mode List: Tampilkan dalam tabel
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama File</th>
                            <th>Dokumen Tahun</th>
                            <th>Tanggal Upload</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {akuntabilitas.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.tahun}</td>
                              <td>{item.published_at}</td>
                              <td>
                                {item.file ? (
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                      if (item.type == "file") {
                                        const link =
                                          document.createElement("a");
                                        link.target = "_blank";
                                        link.href = item.file;
                                        link.download = item.file;
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                      } else if (item.type == "link") {
                                        window.open(item.file, "_blank");
                                      }
                                    }}
                                  >
                                    {item.type == "file"
                                      ? "Unduh Dokumen"
                                      : "Buka Link"}
                                  </button>
                                ) : (
                                  <p>Dokumen tidak tersedia</p>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      // Mode Grid: Tampilkan dalam grid dengan gambar
                      <div className="row">
                        {akuntabilitas.map((item, index) => (
                          <div className="col-md-6" key={index}>
                            <div className="tab-pane animated fadeInUp show active mb-2">
                              <div className="card-item d-flex">
                                {/* Gambar di sebelah kiri */}
                                <div className="col-4 pe-3">
                                  {" "}
                                  {/* Tambahkan padding di sebelah kanan gambar */}
                                  <Image
                                    style={{
                                      cursor: "pointer",
                                      border: "1px solid #000000",
                                      borderRadius: 5,
                                      width: "100%", // Gambar mengisi lebar container
                                      height: "auto", // Tinggi disesuaikan secara proporsional
                                    }}
                                    src={item.thumbnail}
                                    alt={item.name}
                                    width={120} // Lebar gambar diperkecil
                                    height={180} // Tinggi gambar diperkecil
                                  />
                                </div>

                                {/* Informasi di sebelah kanan */}
                                <div className="col-8 ps-3">
                                  {" "}
                                  {/* Tambahkan padding di sebelah kiri teks */}
                                  <table
                                    style={{
                                      width: "100%",
                                      borderCollapse: "collapse",
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            width: "42%",
                                            verticalAlign: "top",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Nama File
                                        </td>
                                        <td style={{ verticalAlign: "top" }}>
                                          :
                                        </td>
                                        <td>{item.name}</td>
                                      </tr>
                                      <tr>
                                        <td style={{ fontWeight: "bold" }}>
                                          Dokumen tahun
                                        </td>
                                        <td>:</td>
                                        <td>{item.tahun}</td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            verticalAlign: "top",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Tanggal Upload
                                        </td>
                                        <td style={{ verticalAlign: "top" }}>
                                          :
                                        </td>
                                        <td style={{ verticalAlign: "top" }}>
                                          {item.published_at}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div className="xb-item--btn mt-20 mb-3">
                                    {item.file && (
                                      <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                          if (item.type == "file") {
                                            const link =
                                              document.createElement("a");
                                            link.href = item.file;
                                            link.target = "_blank";
                                            link.download = item.file;
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                          } else if (item.type === "link") {
                                            window.open(item.file, "_blank");
                                          }
                                        }}
                                      >
                                        {item.type == "file"
                                          ? "Unduh Dokumen"
                                          : "Buka Link"}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    <ErrorHandler errorMessage={errorMessage} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* coaching single end */}
      </div>
    </>
  );
};

export default Akuntabilitas;
