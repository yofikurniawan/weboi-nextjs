import axios from "axios";
import { BaseUrl } from "./apiServer";


const baseUri = BaseUrl();
const apiKey = "webOI!#2024";


export async function fetchNavbar() {
  try {
    const res = await fetch(baseUri + "/navbar", {
      // credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        "X-API-Key": apiKey,
      },
    });
    // Cek apakah respons berhasil (status 200-299)
    if (!res.ok) {
      // Parsing error JSON jika status bukan 200-299
      const errorData = await res.json();
      // Ambil pesan dari respons error
      throw new Error(
        errorData.message || `Server error: ${res.status} ${res.statusText}`
      );
    }

    // Jika respons berhasil
    const data = await res.json();
    return data;
  } catch (error: any) {
    // Menangani kesalahan dari fetch atau dari pengecekan status
    console.error("Fetch navbar error:", error.message);
    return {
      status: "error",
      message: error.message || "An error occurred. Please try again later.",
    };
  }
}


export async function fetchUser() {
  try {
    const res = await axios.get(baseUri + "/navbar", {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
    const data = await res.data;
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}