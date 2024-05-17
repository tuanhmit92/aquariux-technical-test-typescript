export interface WeatherData {
  keySearch: string;
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
