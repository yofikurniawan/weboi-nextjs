import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { fetchNavbar } from "@/apis/fetchNavbar";
import { useCallback } from "react";

const Header = () => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const currCityRef = useRef("Indralaya");
  const unitsRef = useRef("metric");

  function convertTimeStamp(timestamp: number, timezone: number) {
    const convertTimezone = timezone / 3600;
    const date = new Date(timestamp * 1000);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(
        convertTimezone
      )}`,
      hour12: true,
    };
    return date.toLocaleString("id", options);
  }

  function convertCountryCode(country: string) {
    const regionNames = new Intl.DisplayNames(["id"], { type: "region" });
    return regionNames.of(country);
  }

  const getWeather = useCallback(() => {
    const API_KEY = "071d41ad66618f4407c7fcb2d80bbefd";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${currCityRef.current}&appid=${API_KEY}&units=${unitsRef.current}`
    )
      .then((res) => res.json())
      .then((data) => {
        const city = document.querySelector(".weather__city") as HTMLElement;
        const datetime = document.querySelector(
          ".weather__datetime"
        ) as HTMLElement;
        const weather__forecast = document.querySelector(
          ".weather__forecast"
        ) as HTMLElement;
        const weather__temperature = document.querySelector(
          ".weather__temperature"
        ) as HTMLElement;
        const weather__icon = document.querySelector(
          ".weather__icon"
        ) as HTMLElement;
        const weather__minmax = document.querySelector(
          ".weather__minmax"
        ) as HTMLElement;
        const weather__realfeel = document.querySelector(
          ".weather__realfeel"
        ) as HTMLElement;
        const weather__humidity = document.querySelector(
          ".weather__humidity"
        ) as HTMLElement;
        const weather__wind = document.querySelector(
          ".weather__wind"
        ) as HTMLElement;
        const weather__pressure = document.querySelector(
          ".weather__pressure"
        ) as HTMLElement;

        if (city)
          city.innerHTML = `${data.name}, ${convertCountryCode(
            data.sys.country
          )}`;
        if (datetime)
          datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
        if (weather__forecast)
          weather__forecast.innerHTML = `<p>${data.weather[0].main}`;
        if (weather__temperature)
          weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
        if (weather__icon)
          weather__icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;
        if (weather__minmax)
          weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
        if (weather__realfeel)
          weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
        if (weather__humidity)
          weather__humidity.innerHTML = `${data.main.humidity}%`;
        if (weather__wind)
          weather__wind.innerHTML = `${data.wind.speed} ${
            unitsRef.current === "imperial" ? "mph" : "m/s"
          }`;
        if (weather__pressure)
          weather__pressure.innerHTML = `${data.main.pressure} hPa`;
      });
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const searchForm = document.querySelector(
        ".weather__search"
      ) as HTMLFormElement;
      const searchInput = document.querySelector(
        ".weather__searchform"
      ) as HTMLInputElement;

      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        currCityRef.current = searchInput.value;
        getWeather();
        searchInput.value = "";
      });

      document
        .querySelector(".weather_unit_celsius")
        ?.addEventListener("click", () => {
          if (unitsRef.current !== "metric") {
            unitsRef.current = "metric";
            getWeather();
          }
        });

      document
        .querySelector(".weather_unit_farenheit")
        ?.addEventListener("click", () => {
          if (unitsRef.current !== "imperial") {
            unitsRef.current = "imperial";
            getWeather();
          }
        });

      getWeather(); // Initial call to load weather data
    }
  }, [getWeather]);


  useEffect(() => {
    setIsMounted(true);

    fetchNavbar()
      .then((responseData) => {
        if (responseData.status === "error") {
          // Jika terjadi error, simpan pesan error
          setError(responseData.message);
          return; // Hentikan eksekusi lebih lanjut
        }

        let menu = responseData["data"]?.filter(
          (item: any) => item.name_parent === "Main Menu"
        );
        setData(menu || []); // Fallback ke array kosong jika data tidak ada
      })
      .catch((err) => {
        // Tangani error lain yang tidak terduga
        setError("An unexpected error occurred");
      });
  }, []);

  const renderMenu = (items: any[]) => {
    if (!Array.isArray(items)) {
      return null; // handle jika items bukan array
    }

    return (
      <ul>
        {items.map((item: any) => (
          <li
            key={item.id}
            className={
              item.childs && item.childs.length > 0
                ? "menu-item-has-children"
                : ""
            }
          >
            {item.url === "/" ? (
              <Link href={item.url}>
                <span>{item.name}</span>
              </Link>
            ) : (
              <Link href={item.url || "#"}>
                <span>{item.name}</span>
              </Link>
            )}
            {item.childs && item.childs.length > 0 && (
              <ul className="submenu">
                {item.childs.map((child: any) => (
                  <li
                    key={child.id}
                    className={
                      child.childs && child.childs.length > 0
                        ? "menu-item-has-children"
                        : ""
                    }
                  >
                    <Link href={child.url || "#"}>
                      <span>{child.name}</span>
                    </Link>
                    {child.childs && child.childs.length > 0 && (
                      <ul className="submenu">
                        {child.childs.map((subChild: any) => (
                          <li key={subChild.id}>
                            <Link href={subChild.url || "#"}>
                              <span>{subChild.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderMenuMobile = (items: any[]) => {

    if (!Array.isArray(items)) {
      return null; // or handle the case where items is not an array
    }

    return (
      <ul>
        {items.map((item: any) => (
          <li
            key={item.id}
            className={
              item.childs && item.childs.length > 0
                ? "menu-item menu-item-has-children"
                : ""
            }
          >
            <Link
              href={item.url || "#"}

            >
              <span>{item.name}</span>
            </Link>
            {item.childs && item.childs.length > 0 && (
              <ul className="sub-menu">
                {item.childs.map((child: any) => (
                  <li
                    key={child.id}
                    className={
                      child.childs && child.childs.length > 0 ? "menu-item" : ""
                    }
                  >
                    <Link href={child.url || "#"}>
                      <span>{child.name}</span>
                    </Link>
                    {child.childs && child.childs.length > 0 && (
                      <ul className="sub-menu">
                        {child.childs.map((subChild: any) => (
                          <li key={subChild.id}>
                            <Link href={subChild.url || "#"}>
                              <span>{subChild.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );

  };

  return (
    <>
      <div>
        <header className="site-header header-style-zone">
          <div className="header__top-wrap primary-bg">
            <div className="container">
              <div className="weather__header d-none">
                <form className="weather__search">
                  <input
                    type="text"
                    placeholder="Search for a city..."
                    className="weather__searchform"
                  />
                  <i className="fa-solid fa-magnifying-glass" />
                </form>
                <div className="weather__units">
                  <span className="weather_unit_celsius">°C</span>
                  <span className="weather_unit_farenheit">°F</span>
                </div>
              </div>
              <div className="weather__body ">
                <div className="weather__datetime"></div>
                <div className="weather__data">
                  <span className="weather__city" />
                  <div className="desc">
                    <div className="weather__icon" />
                    <span className="weather__temperature" />
                    <div className="weather__forecast" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="header__wrap stricky">
            <div className="container">
              <div className="header__inner ul_li_between">
                <div className="header__logo">
                  <Link href="/">
                    <Image
                      src="/images/logo/Logo_pemkab_oi.png"
                      alt=""
                      width={250} // Tetap gunakan lebar sebagai referensi
                      height={150} // Tetap gunakan tinggi sebagai referensi
                      style={{ width: "100%", height: "auto" }} // Lebar 100%, tinggi otomatis
                      priority
                    />
                  </Link>
                </div>

                <div className="main-menu__wrap ul_li navbar navbar-expand-lg">
                  <nav className="main-menu collapse navbar-collapse">
                    <ul>{isMounted && data.length > 0 && renderMenu(data)}</ul>
                  </nav>
                </div>

                <div className="xb-hamburger-menu">
                  <div className="xb-nav-mobile">
                    <div className="xb-nav-mobile-button">
                      <i className="fal fa-bars" />
                    </div>
                  </div>
                </div>
                <ul className="header__action ul_li"></ul>
              </div>
            </div>
          </div>

          <div className="header-search-form-wrapper">
            <div className="xb-search-close xb-close" />
            <div className="header-search-container">
              <form role="search" className="search-form" action="#">
                <input
                  type="search"
                  className="search-field"
                  placeholder="Search …"
                  defaultValue=""
                  name="s"
                />
              </form>
            </div>
          </div>

          <div className="xb-header-wrap">
            <div className="xb-header-menu">
              <div className="xb-header-menu-scroll">
                <div className="xb-menu-close xb-hide-xl xb-close" />
                <div className="xb-logo-mobile xb-hide-xl">
                  <Link href="/" rel="home">
                    <Image
                      src="/images/logo/Logo_pemkab_oi.png"
                      alt=""
                      width={250} // Tetap gunakan lebar sebagai referensi
                      height={150} // Tetap gunakan tinggi sebagai referensi
                      style={{ width: "100%", height: "auto" }} // Lebar 100%, tinggi otomatis
                      priority
                    />
                  </Link>
                </div>
                <nav className="xb-header-nav">
                  <ul className="xb-menu-primary clearfix">
                    {isMounted && data.length > 0 && renderMenuMobile(data)}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="xb-header-menu-backdrop" />
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
