const apiKey: string = "bd5e378503939ddaee76f12ad7a97608";

import type {
  RequestArgs,
  GetWeatherRequestArgs,
  GetWeatherResponse,
  GetWeatherError,
} from "./types";

const ApiServices = {
  async request<T, E>({ options }: RequestArgs): Promise<T | E> {
    const response = await fetch(options.url);
    if (!response.ok) {
      const data: E = await response.json();
      return data;
    }
    const data: T = await response.json();
    return data;
  },
  getWeather({ keySearch }: GetWeatherRequestArgs) {
    const options = {
      url: `https://api.openweathermap.org/data/2.5/weather?q=${keySearch}&units=metric&appid=${apiKey}`,
      method: "get",
    };
    return ApiServices.request<GetWeatherResponse, GetWeatherError>({
      options,
    });
  },
};
export default ApiServices;
