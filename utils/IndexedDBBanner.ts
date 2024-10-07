import { openDB } from "idb";

const DB_NAME = "BannerDB";
const STORE_NAME = "BannerStore";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "filter" });
      }
    },
  });
};

export const saveDataToIndexedDB = async (filter: string, data: any) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put({ filter, data });
  await tx.done;
};

export const getDataFromIndexedDB = async (filter: string) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return await store.get(filter);
};
