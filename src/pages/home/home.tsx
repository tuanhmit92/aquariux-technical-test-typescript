import { useContext, useState } from "react";
import { format } from "date-fns";

import { AppContext } from "../../contexts/app-context";
import InfoBlock from "../../components/info-block/info-block";
import SearchHistory from "../../components/search-history/search-history";
import Search from "../../components/search/search";
import ApiServices from "../../services/ApiServices";
import { RequestHandler } from "../../utils/http-handler";

import { WeatherData } from "./types";

import iconLight from "../../assets/images/icons/icon-light.png";
import iconDark from "../../assets/images/icons/icon-dark.png";
import iconScroll from "../../assets/images/icons/icon-scroll.png";

import "./home.scss";

const Home = () => {
  const appContext = useContext(AppContext);
  const [keySearch, setKeySearch] = useState<string>("");
  const [dataWeather, setDataWeather] = useState<WeatherData>({
    keySearch: "",
    weather: { id: 0, main: "" },
    name: "",
    temp: "",
    tempMax: "",
    tempMin: "",
    humidity: 0,
    dateTime: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    const clientWidth = document.documentElement.clientWidth;
    if (clientWidth > 480) {
      if (scrolled > 300) {
        setVisible(true);
      } else if (scrolled <= 200) {
        setVisible(false);
      }
    } else {
      if (scrolled > 150) {
        setVisible(true);
      } else if (scrolled <= 150) {
        setVisible(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);

  const getKeySearch = (key: string) => {
    setErrorMessage("");
    setKeySearch(key);
  };

  const search = () => {
    if (keySearch) {
      setKeySearch("");
      getDataWeather(keySearch, false);
    }
  };

  const clear = () => {
    setKeySearch("");
  };

  const getDataWeather = async (keySearch: string, research: boolean) => {
    const response = await ApiServices.getWeather({
      keySearch,
    });
    RequestHandler(
      response,
      (result) => {
        const dataTemp = {
          keySearch: keySearch,
          weather: result.weather[0],
          name: `${result.name}, ${result.sys.country}`,
          temp: result.main.temp.toFixed(0),
          tempMax: result.main.temp_max.toFixed(0),
          tempMin: result.main.temp_min.toFixed(0),
          humidity: result.main.humidity,
          dateTime: format(
            result.dt * 1000 + result.timezone,
            "dd-MM-yyyy hh:mmaaa"
          ),
        };
        setDataWeather(dataTemp);
        if (!research && appContext) {
          appContext.setSearchHistory([dataTemp, ...appContext.searchHistory]);
        }
      },
      (error) => {
        setErrorMessage(error.message);
      }
    );
  };

  return (
    <div className={`home ${appContext.theme}`}>
      <div className="home__wrapper">
        <div
          className="home__wrapper__theme-switch"
          onClick={() => {
            appContext.setTheme(appContext.theme == "dark" ? "light" : "dark");
          }}
        >
          <img src={appContext.theme == "dark" ? iconDark : iconLight} />
        </div>
        <Search
          keySearch={keySearch}
          setKeySearch={setKeySearch}
          callbackKeySearch={getKeySearch}
          callback={search}
          clear={clear}
        />
        <div className="home__wrapper__error">
          <p>{errorMessage}</p>
        </div>
        <div className="home__wrapper__main">
          <InfoBlock dataWeather={dataWeather} />
          <SearchHistory research={getDataWeather} />
        </div>
      </div>
      <div
        className="home__icon-scroll"
        style={{ display: visible ? "inline" : "none" }}
        onClick={scrollToTop}
      >
        <img src={iconScroll} />
      </div>
    </div>
  );
};
export default Home;
