import { openDB } from "idb";

const DB_NAME = "BeritaDB";
const STORE_NAME = "beritaStore";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

// Fungsi untuk menyimpan data ke IndexedDB
export const saveDataToIndexedDB = async (data: any[]) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  data.forEach((item) => store.put(item)); // Simpan data
  await tx.done; // Tunggu hingga transaksi selesai
};

// Fungsi untuk mendapatkan semua data dari IndexedDB
export const getDataFromIndexedDB = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return store.getAll(); // Ambil semua data
};

// Fungsi untuk menghapus semua data dari IndexedDB
export const clearIndexedDB = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.clear(); // Hapus semua data
  await tx.done; // Tunggu hingga transaksi selesai
};