import { useEffect, useState } from "react";
import {
  initDB,
  getDataFromIndexedDB,
  saveDataToIndexedDB,
} from "@/utils/indexedDBHero";
import { fetchDataBeritaTerbaru } from "@/apis/fetchdata"; // Pastikan Anda mengimpor fungsi ini

const useBerita = () => {
  const [terbaru, setTerbaru] = useState<any[]>([]);

  useEffect(() => {
    const fetchBeritaWithCache = async () => {
      try {
        const db = await initDB();
        const cachedData = await getDataFromIndexedDB(); // Mengambil semua data dari IndexedDB
        console.log("Cached Data:", cachedData); // Cek data dari IndexedDB

        // Set data dari cache jika ada
        if (cachedData.length > 0) {
          setTerbaru(cachedData);
        }

        const res = await fetchDataBeritaTerbaru(); // Ambil data terbaru dari API
        console.log("Response from API:", res); // Cek respon dari API

        // Jika API berhasil dan data valid
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          // Update atau tambahkan data ke IndexedDB
          const tx = db.transaction("berita", "readwrite");
          const store = tx.objectStore("berita");

          res.data.forEach((item: { id: any }) => {
            // Simpan data ke IndexedDB
            store.put(item);
          });

          // Set data state dengan data terbaru
          setTerbaru(res.data);
          await tx.done; // Tunggu hingga transaksi selesai
        }
      } catch (error) {
        console.error("Error fetching or caching data:", error);
      }
    };

    fetchBeritaWithCache();
  }, []); // Kosongkan dependensi untuk fetch sekali saat mount

  return terbaru;
};

export default useBerita;
