import { GetWeatherError, GetWeatherResponse } from "../services/types";
interface ResponseCallback {
  (response: GetWeatherResponse): void;
}

interface ErrorCallback {
  (response: GetWeatherError): void;
}

export enum HTTP_ERROR {
  "NOT_FOUND" = 404,
}

export const RequestHandler = (
  response: GetWeatherResponse | GetWeatherError,
  callback: ResponseCallback,
  errorCallback: ErrorCallback
): void => {
  if ((response as GetWeatherError).cod == HTTP_ERROR.NOT_FOUND) {
    errorCallback(response as GetWeatherError);
  } else {
    callback(response as GetWeatherResponse);
  }
};
