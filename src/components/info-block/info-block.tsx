import { InfoBlockProps } from "./types";

import imgSun from "../../assets/images/sun.png";
import imgCloud from "../../assets/images/cloud.png";
import "./info-block.scss";

const InfoBlock = ({ dataWeather }: InfoBlockProps) => {
  const { weather, name, temp, tempMax, tempMin, humidity, dateTime } =
    dataWeather;

  return (
    <div className="info-block">
      <img src={weather.id == 800 ? imgSun : imgCloud} />
      <div className="info-block__wrapper">
        <p>Today's Weather</p>
        <p className="info-block__wrapper__temp">{temp}&deg;</p>
        <p>
          H: {tempMax}&deg; L: {tempMin}&deg;
        </p>
        <div className="info-block__wrapper__info">
          <p className="info-block__wrapper__info__location">{name}</p>
          <div className="info-block__wrapper__info__group">
            <p>{weather.main}</p>
            <p>Humidity: {humidity}%</p>
            <p>{dateTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoBlock;
