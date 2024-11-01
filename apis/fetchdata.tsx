import axios from "axios";
import { BaseUrl } from "./apiServer";

const baseUri = BaseUrl();

const apiKey = "webOI!#2024";
// console.log("API_KEY", apiKey);


export async function fetchDataBerita(page: string = "1") {
  try {
    const res = await axios.get(`${baseUri}/berita?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
    return res.data; // Pastikan API mengembalikan data dengan informasi pagination
  } catch (error) {
    // Mengambil pesan kesalahan yang lebih spesifik
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      return {
        status: "error",
        message: error.response?.data?.message || "Something went wrong",
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        status: "error",
        message: "An unexpected error occurred",
      };
    }
  }
}

// detail berita slug
export async function fetchDataDetailBerita(slug: string) {
  try {
    const res = await axios.get(baseUri + "/berita/" + slug, {
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

export async function fetchDataBeritaTerbaru(width?: number, height?: number) {
  try {
    const res = await axios.get(`${baseUri}/berita-terbaru`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      params: {
        width, // Mengirimkan parameter width jika ada
        height, // Mengirimkan parameter height jika ada
      },
    });
    return res.data;
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

export async function fetchDataBeritaPopuler() {
  try {
    const res = await axios.get(`${baseUri}/berita-populer`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
    return res.data;
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

// list category article
export async function fetchDataCategoryArticle() {
  try {
    const res = await axios.get(`${baseUri}/berita-category`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
    return res.data;
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

// foto
export async function fetchDataFoto(page: string = "1") {
  try {
    const res = await axios.get(`${baseUri}/gallery?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
    return res.data; // Pastikan API mengembalikan data dengan informasi pagination
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}


// detail foto slug
export async function fetchDataDetailFoto(slug: string) {
  try {
    const res = await axios.get(baseUri + "/gallery/" + slug, {
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

// video
export async function fetchDataVideo(page: string = "1") {
  try {
    const res = await axios.get(`${baseUri}/video?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
    return res.data; // Pastikan API mengembalikan data dengan informasi pagination
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

// detail video slug
export async function fetchDataDetailVideo(slug: string) {
  try {
    const res = await axios.get(baseUri + "/video/" + slug, {
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

export async function fetchDataAplikasiLayanan() {
  const apiUrl = "https://aptika.oganilirkab.go.id/api/aplikasilayanan";

  try {
    const res = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "aptikaApp@2024", // Add your API key here
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

export async function fetchDataJenisAplikasi(jenisPd = "Perangkat Daerah") {
  const apiUrl = `https://aptika.oganilirkab.go.id/api/jenisAplikasi?jenis_pd=${jenisPd}`;

  try {
    const res = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "aptikaApp@2024", // API Key
      },
    });
    const data = await res.data;
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error, // Return the error message
    };
  }
}


// download
export async function fetchDataDownload(page: string = "1") {
  try {
    const res = await axios.get(`${baseUri}/download?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
    return res.data; // Pastikan API mengembalikan data dengan informasi pagination
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

// detail download slug
export async function fetchDataDetailDownload(slug: string) {
  try {
    const res = await axios.get(baseUri + "/download/" + slug, {
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

// pengumuman
export async function fetchDatapengumuman(page: string = "1") {
  try {
    const res = await axios.get(`${baseUri}/pengumuman?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
    return res.data; // Pastikan API mengembalikan data dengan informasi pagination
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

// detail pengumuman slug
export async function fetchDataDetailPengumuman(slug: string) {
  try {
    const res = await axios.get(baseUri + "/pengumuman/" + slug, {
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

// pages slug
export async function fetchDataPages(slug: string) {
  try {
    const res = await axios.get(baseUri + "/pages/" + slug, {
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


// akuntabilitas 
export async function fetchDataAkuntabilitas(category_id: string = "1", tahun: string = "") {
  try {
    const res = await axios.get(
      `${baseUri}/akuntabilitas?category_id=${category_id}&tahun=${tahun}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      }
    );
    return res.data; // Pastikan API mengembalikan data dengan informasi pagination
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

// list category akuntabilitas
export async function fetchDataCategoryAkuntabilitas() {
  try {
    const res = await axios.get(`${baseUri}/akuntabilitas-category`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
    return res.data;
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

// banner get
export async function fetchDataBanner() {
  try {
    const res = await axios.get(`${baseUri}/banner`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
    return res.data;
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

// banner get
export async function fetchDataIdentity() {
  try {
    const res = await axios.get(`${baseUri}/identity`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
    return res.data;
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}


// get list filter tahun
export async function fetchDataFilterTahun() {
  try {
    const res = await axios.get(`${baseUri}/filter-kepala-pemerintahan`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
    return res.data;
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

// kepela pemerintahan ?periode=2021-2026
export async function fetchDataKepalaPemerintahan(periode: string = "2021 - 2024") {
  try {
    const res = await axios.get(
      `${baseUri}/kepala-pemerintahan?periode=${periode}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      }
    );
    return res.data;
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

// prestasi
export async function fetchDataPrestasi(
  page: string = "1",
  search: string = "",
  tahun: string = ""
) {
  try {
    // Membentuk query params dengan opsional page, search, dan tahun
    let queryParams = `?page=${page}`;
    if (search) {
      queryParams += `&search=${encodeURIComponent(search)}`;
    }
    if (tahun) {
      queryParams += `&tahun=${encodeURIComponent(tahun)}`;
    }

    const res = await axios.get(`${baseUri}/prestasi-list${queryParams}`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
    return res.data; // Pastikan API mengembalikan data dengan informasi pagination
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

// fetch visitor
export async function fetchVisitor() {
  try {
    const res = await axios.get(baseUri + "/visitor", {
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


// pengumuman home
export async function fetchPengumumanHome() {
  try {
    const res = await axios.get(baseUri + "/pengumuman-home", {
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