import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchDataJenisAplikasi } from "@/apis/fetchdata";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getDataFromIndexedDB, saveDataToIndexedDB } from "@/utils/IndexedDbPd"; // Import fungsi IndexedDB

const PerangkatDaerah = () => {
  const [jenisAplikasi, setJenisAplikasi] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [filter, setFilter] = useState<string>("Perangkat Daerah");

  // Fungsi untuk fetch data
  const fetchData = async (filterValue: string) => {
    setLoading(true);
    setErrorMessage(""); // Reset error message sebelum fetch data
    setJenisAplikasi([]); // Reset jenisAplikasi sebelum fetch data

    try {
      // Cek apakah data tersedia di cache IndexedDB
      const cachedData = await getDataFromIndexedDB(filterValue);
      if (cachedData && cachedData.data) {
        // console.log("Data diambil dari IndexedDB");
        setJenisAplikasi(cachedData.data);
        setLoading(false);
        return;
      }

      // Jika tidak ada data di cache, fetch dari API
      const res = await fetchDataJenisAplikasi(filterValue);
      if (res && res.data && res.data.length > 0) {
        setJenisAplikasi(res.data);
        // Simpan data ke IndexedDB
        await saveDataToIndexedDB(filterValue, res.data);
      } else {
        setJenisAplikasi([]);
        setErrorMessage("Data Tidak Ditemukan ...");
      }
    } catch (err) {
      console.error("Error saat fetching data:", err);
      setErrorMessage("Failed to fetch data.");
      setJenisAplikasi([]);
    } finally {
      setLoading(false);
    }
  };

  // Panggil data pertama kali dengan filter "Perangkat Daerah"
  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  const handleSearchClick = () => {
    fetchData(filter);
  };

  return (
    <>
      <div className="xb-country ul_li mb-2 d-flex justify-content-end align-items-center">
        <select
          className="form-select me-3"
          style={{ width: "200px" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Perangkat Daerah">Perangkat Daerah</option>
          <option value="Puskesmas">Puskesmas</option>
          <option value="Kecamatan">Kecamatan</option>
          <option value="Desa/Kelurahan">Desa/Kelurahan</option>
        </select>
        <button
          className="btn btn-primary btn-lg me-3"
          style={{ backgroundColor: "#164cbb" }}
          onClick={handleSearchClick}
        >
          <i className="bi bi-search me-2"></i>
          Cari
        </button>
      </div>
      <div className="xb-country ul_li mt-3">
        {loading ? (
          <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
            {Array.from({
              length: jenisAplikasi.length > 0 ? jenisAplikasi.length : 12,
            }).map((_, index) => (
              <div className="xb-item--item" key={index}>
                <Skeleton height={100} width={150} />
                <h3 className="xb-item--title">
                  <Skeleton count={2} />
                </h3>
              </div>
            ))}
          </SkeletonTheme>
        ) : errorMessage ? (
          <p className="text-center text-danger">{errorMessage}</p>
        ) : jenisAplikasi && jenisAplikasi.length > 0 ? (
          <>
            {jenisAplikasi.map((item, index) => (
              <div className="xb-item--item" key={index}>
                <a
                  href={item.url_web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="xb-item--inner ul_li"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "180px",
                    backgroundColor: "white",
                    backgroundPosition: "calc(109% + 0.5rem) 85%",
                    backgroundSize: "20% auto",
                    backgroundRepeat: "no-repeat",
                    backgroundImage:
                      "url('https://aptika.oganilirkab.go.id/public_assets/new_assets/assets/img/misc/infography.svg')",
                  }}
                >
                  <div className="xb-item--flag">
                    <Image
                      src={item.thumbnail}
                      alt={item.sector}
                      width={150}
                      height={150}
                    />
                  </div>
                  <h3 className="xb-item--title">
                      {item.nama_website}
                    <br />
                  </h3>
                </a>
              </div>
            ))}
            <div className="xb-item--item">
              <a
                href="https://aptika.oganilirkab.go.id/website"
                className="xb-item--inner ul_li"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "180px",
                  backgroundColor: "white",
                  backgroundPosition: "calc(109% + 0.5rem) 85%",
                  backgroundSize: "20% auto",
                  backgroundRepeat: "no-repeat",
                  backgroundImage:
                    "url('https://aptika.oganilirkab.go.id/public_assets/new_assets/assets/img/misc/infography.svg')",
                }}
              >
                <div className="xb-item--flag">
                  <Image src="/images/icon/more.svg" alt="" width={150} height={150} />
                </div>
                <h3 className="xb-item--title">
                  Selengkapnya
                  <br />
                </h3>
              </a>
            </div>
          </>
        ) : (
          <div>Tidak ada data tersedia</div>
        )}
      </div>
    </>
  );
};

export default PerangkatDaerah;
