import axios from "axios";
import { BaseUrl } from "./apiServer";


const baseUri = BaseUrl();
const apiKey = "webOI!#2024";


// export async function fetchNavbar() {
//   try {
//     const res = await fetch(baseUri + "/navbar", {
//       headers: {
//         "Content-Type": "application/json",
//         "X-API-Key": apiKey,
//       },
      
//     });

//     // Cek apakah respons berhasil (status 200-299)
//     if (!res.ok) {
//       // Parsing error JSON jika status bukan 200-299
//       const errorData = await res.json();
//       // Ambil pesan dari respons error
//       throw new Error(
//         errorData.message || `Server error: ${res.status} ${res.statusText}`
//       );
//     }

//     // Jika respons berhasil
//     const data = await res.json();
//     return data;
//   } catch (error: any) {
//     // Menangani kesalahan dari fetch atau dari pengecekan status
//     console.error("Fetch navbar error:", error.message);
//     return {
//       status: "error",
//       message: error.message || "An error occurred. Please try again later.",
//     };
//   }
// }

// Tipe untuk data yang diharapkan dari API
interface NavbarData {
  status: string;
  message: string;
  // Tambahkan properti lainnya sesuai dengan data yang dikembalikan API
}

// Tipe untuk error response
interface ErrorResponse {
  status: string;
  message: string;
}

// Fungsi untuk mengambil data navbar
export async function fetchNavbar(): Promise<NavbarData | ErrorResponse> {
  try {
    const res = await axios.get<NavbarData>(`${baseUri}/navbar`, {
      
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,  // Pastikan API Key Anda benar
      },
      withCredentials: true,  // Kirimkan cookies jika perlu
    });

    // Mengembalikan data dari API jika respons berhasil
    return res.data;
  } catch (error: any) {
    // Menangani kesalahan dari axios atau respons API
    console.error("Axios error:", error.message);

    // Kembalikan pesan error jika ada, atau pesan default jika tidak ada
    return {
      status: "error",
      message: error.response?.data?.message || error.message || "An error occurred. Please try again later.",
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