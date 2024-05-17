export interface WeatherData {
  weather: {
    id: number;
    main: string;
  };
  name: string;
  temp: string;
  tempMax: string;
  tempMin: string;
  humidity: number;
  dateTime: string;
}

export interface InfoBlockProps {
  dataWeather: WeatherData;
}
