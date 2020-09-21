import { useEffect, useState } from "react";
import axios from "axios";

export const useApiProgress = (apiPath) => {
  const [pendingApiCall, setpendingApiCall] = useState(false);

  // Neye göre değişeceği verilmezse componentDidMount çalışınca çalışır
  useEffect(() => {
    let requestInterceptor, responseInterceptor;

    const updateApiCallFor = (url, inProgress) => {
      if (url === apiPath) {
        setpendingApiCall(inProgress);
      }
    };

    const registerInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use((request) => {
        updateApiCallFor(request.url, true);
        return request;
      });

      responseInterceptor = axios.interceptors.response.use(
        (response) => {
          updateApiCallFor(response.config.url, false);
          return response;
        },
        (error) => {
          updateApiCallFor(error.config.url, false);
          throw error;
        }
      );
    };

    const unregisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor); // Interceptorları temizlemek için
      axios.interceptors.response.eject(responseInterceptor);
    };

    registerInterceptors();

    // Component unmount olunca çalışır
    return function unmount() {
      unregisterInterceptors();
    };
  });

  return pendingApiCall;
};
