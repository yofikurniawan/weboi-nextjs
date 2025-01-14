import Head from "next/head";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import {
  fetchDataFilterTahun,
  fetchDataKepalaPemerintahan,
} from "@/apis/fetchdata";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const KepalaDaerah = () => {
  const [dataFilter, setDataFilter] = useState<string[]>([]);
  const [dataKepalaPemerintahan, setDataKepalaPemerintahan] = useState<any[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedYear, setSelectedYear] = useState<string>(""); // Awalnya kosong

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchDataFilterTahun(); // Memanggil API untuk filter
        if (response.success) {
          setDataFilter(response.data); // Menyimpan data filter dari API ke state

          // Set default year ke periode terakhir dari data filter
          const lastYear = response.data[response.data.length - 1]; // Ambil periode terakhir
          setSelectedYear(lastYear); // Set selectedYear ke periode terakhir

          // Secara otomatis panggil fetchData dengan filter default saat data berhasil diambil
          fetchData(lastYear); // Mengambil data dengan default filter
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const fetchData = async (year: string) => {
    setLoading(true);
    try {
      const response = await fetchDataKepalaPemerintahan(year); // Mengambil data kepala pemerintahan
      if (response.success) {
        setDataKepalaPemerintahan(response.data); // Menyimpan data dari API ke state
      } else {
        setDataKepalaPemerintahan([]); // Kosongkan data jika tidak ada
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataKepalaPemerintahan([]); // Kosongkan data jika terjadi kesalahan
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value); // Update tahun yang dipilih
  };

  const handleSearch = () => {
    fetchData(selectedYear); // Panggil fungsi untuk mengambil data berdasarkan tahun yang dipilih
  };

  return (
    <>
      <Head>
        <title>Detail Pages | Web Ogan Ilir</title>
      </Head>
      <Breadcrumb
        breadcrumbData={[
          { title: "Beranda", url: "/" },
          { title: "Profil Kepala Daerah" },
        ]}
      />

      <div className="xb-backtotop">
        <a href="#" className="scroll">
          <i className="far fa-arrow-up" />
        </a>
      </div>

      <section className="service-single pt-120 pb-130">
        <div className="container">
          <div className="xb-country ul_li d-flex justify-content-end align-items-center mb-5">
            <h5 className="me-3">Pilih Priode</h5>
            <select
              className="form-select me-3"
              style={{ width: "200px" }}
              value={selectedYear}
              onChange={handleYearChange}
            >
              {dataFilter.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary btn-lg me-3"
              style={{ backgroundColor: "#164cbb" }}
              onClick={handleSearch} // Panggil fungsi pencarian
            >
              <i className="bi bi-search me-2"></i>
              Cari
            </button>
          </div>

          <div className="row profil-pimpinan">
            {loading ? (
              <Skeleton count={5} />
            ) : dataKepalaPemerintahan.length > 0 ? (
              dataKepalaPemerintahan.map((kepala, index) => (
                <div key={index} className="col-lg-12 mb-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="img-kepala">
                        <Image
                          className="cobaSaja"
                          src={kepala.photo}
                          alt=""
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="single-content">
                        <h4 className="fw-bold my-2">Profil Kepala Daerah</h4>
                        <h5>{kepala.position}</h5>
                        <p className="text-pimpinan mt-3">
                          {kepala.description}
                        </p>
                        <h4 className="fw-bold">Karir dan Organisasi</h4>
                        <div className="timelines">
                          {kepala.careers.map((entry: any, idx: number) => (
                            <div className="entry" key={idx}>
                              <div className="title">
                                <h3>
                                  {entry.start_year} - {entry.end_year}
                                </h3>
                                <p>{entry.alias}</p>
                              </div>
                              <div className="body">
                                <p>{entry.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <h4 className="fw-bold mt-20">Pendidikan</h4>
                        <div className="single-content__feature ul_li">
                          {kepala.educations.map((edu: any, idx: number) => (
                            <div className="single-content-feature" key={idx}>
                              <div className="xb-item--inner color-3 ul_li">
                                <div className="xb-item--icon">
                                  <Image
                                    src="/images/icon/teacher.svg" // Ganti dengan icon sesuai API jika ada
                                    alt=""
                                    width={20}
                                    height={20}
                                  />
                                </div>
                                <h3 className="xb-item--titles">{edu.name}</h3>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < dataKepalaPemerintahan.length - 1 && (
                    <div className="divider mx-auto" />
                  )}
                </div>
              ))
            ) : (
              <p>Tidak ada data untuk tahun yang dipilih.</p> // Pesan jika tidak ada data
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default KepalaDaerah;
