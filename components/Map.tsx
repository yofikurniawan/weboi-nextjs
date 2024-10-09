import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import stateData from "../js/exampleGeojson";
import Image from "next/image";

const MapComponent = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    const L = require("leaflet");

    let mymap = L.map("petaIdl").setView(
      [-3.450448063446193, 104.65473311002576],
      10
    );

    // Layer untuk Google Streets
    const googleStreet = L.tileLayer(
      "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        attribution:
          'Map data &copy; <a href="https://oganilirkab.go.id/">Diskominfo Ogan Ilir</a>',
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    // Layer untuk Google Hybrid
    const googleHybrid = L.tileLayer(
      "https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        attribution:
          'Map data &copy; <a href="https://oganilirkab.go.id/">Diskominfo Ogan Ilir</a>',
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    // Menambahkan layer default
    googleStreet.addTo(mymap);

    // Menambahkan transformasi CSS untuk memperbesar tampilan
    const mapElement = document.getElementById("petaIdl");
    if (mapElement) {
      //height: "510px"
      mapElement.style.height = "620px";
      mapElement.style.transformOrigin = "center"; // Pusatkan transformasi
    }

    // Menambahkan kontrol layer
    const baseMaps = {
      "Google Streets": googleStreet,
      "Google Hybrid": googleHybrid,
    };

    L.control.layers(baseMaps).addTo(mymap);

    const myDefaultMarker = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png",
      iconSize: [25, 41],
    });

    // L.marker([-3.450448063446193, 104.65473311002576], {
    //   icon: myDefaultMarker,
    // }).addTo(mymap);

    L.geoJSON(stateData, {
      style: (feature: { properties: { color: any } }) => ({
        color: feature.properties.color || "#000000", // Default to black if no color is specified
        weight: 2, // Set the border weight
        fillColor: feature.properties.color || "#000000", // Set the fill color
        fillOpacity: 0.5, // Set the fill opacity
      }),
      onEachFeature: (
        feature: { properties: { name: any } },
        layer: {
          on: (arg0: { click: () => void }) => void;
          bindPopup: (arg0: string) => void;
        }
      ) => {
        layer.on({
          click: () => {
            markerClick2(feature);
          },
        });

        layer.bindPopup(`<strong>${feature.properties.name}</strong><br>`);
      },
    }).addTo(mymap);

    return () => {
      mymap.remove();
    };
  }, []);

  function markerClick2(feature: { properties?: { name: any; }; informations?: any; }) {
    const informations = feature.informations || {};

    $(".card-img").attr("src", informations.imgUrl || "default-image.jpg");
    $(".card-title").html(informations.placeName || "Nama tidak tersedia");
    $(".card-subtitle").html(
      informations.description || "Deskripsi tidak tersedia"
    );
    $(".card-text").html(informations.cardText || "Keterangan tidak tersedia");

    let items = $(".card-list-group li");

    if (informations.cardList && informations.cardList.length > 0) {
      items.each((index: number, item) => {
        $(item).empty();
      });

      informations.cardList.forEach((card: any[], index: number) => {
        const span = $('<span class="card-list-group-item"></span>').html(
          card[0] || "Label tidak tersedia"
        );
        $(items[index])
          .html(card[1] || "Data tidak tersedia")
          .prepend(span);
      });
    } else {
      items.each((index, item) => {
        $(item).html("Data tidak tersedia");
      });
    }
  }

  return (
    <>
      <div className="col-12 col-lg-8">
        <div id="petaIdl" style={{ height: "510px" }}></div>
      </div>
      <div className="col-lg-4">
        <div
          id="card"
          className="card mb-4 tsigourof_ben6oqe"
          style={{ height: "100%" }}
        >
          <a className="card-switch" href="#">
            <h2 className="card-title">Kabupaten Ogan Ilir</h2>
            <Image
              className="card-img"
              src="/images/web/oganilirkab.jpg"
              alt="OganIlirBangkit"
              width={300}
              height={200}
            />
            <div className="card-body">
              <div className="card-subtitle">
                <p>
                  Ogan Ilir adalah salah satu kabupaten di Provinsi Sumatera
                  Selatan, Indonesia. Ibu kota Ogan Ilir berada di kecamatan
                  Indralaya. Pada pertengahan tahun 2024, jumlah penduduk
                  kabupaten ini sebanyak 443.361 jiwa
                </p>
                <br />
                <p>
                  Sebagian besar penduduk Kabupaten Ogan Ilir adalah beretnis
                  Pegagan. Mayoritas Populasi penduduk di Kabupaten Ogan Ilir
                  berasal dari Suku Melayu dengan 3 (tiga) sub-suku yaitu: Ogan,
                  Penesak, &amp; Pegagan. Lainnya yaitu Belida, Jawa, Rambang
                  dan suku lainnya. Keberagaman suku bangsa di Kabupaten Ogan
                  Ilir memengaruhi perbedaan budaya dan adat istiadat
                  masyarakat. Berikut adalah besaran penduduk Kabupaten Ogan
                  Ilir berdasarkan suku bangsa;
                </p>
              </div>
              <ul className="card-list-group">
                <li>
                  <span className="card-list-group-item">Data </span>
                  Populasi
                </li>
              </ul>
              <div className="card-text">
                <div className="table-responsive">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <i className="fa fa-map me-1" />
                          Luas Wilayah
                        </td>
                        <td>:</td>
                        <td>2.302,86 Km2</td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fa fa-home me-1" />
                          Jumlah Kecamatan
                        </td>
                        <td>:</td>
                        <td>16</td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fa fa-home me-1" />
                          Jumlah Desa/Kel
                        </td>
                        <td>:</td>
                        <td>227/14</td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fa fa-users me-1" />
                          Jumlah Populasi
                        </td>
                        <td>:</td>
                        <td>443.361 Jiwa</td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fa fa-user me-1" />
                          Kepadatan Penduduk
                        </td>
                        <td>:</td>
                        <td>191 Jiwa/Km2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });
