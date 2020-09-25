import { useEffect, useState } from "react";
import axios from "axios";

export const useApiProgress = (apiMethod, apiPath) => {
  const [pendingApiCall, setpendingApiCall] = useState(false);

  // Neye göre değişeceği verilmezse componentDidMount çalışınca çalışır
  useEffect(() => {
    let requestInterceptor, responseInterceptor;

    const updateApiCallFor = (method, url, inProgress) => {
      if (url.startsWith(apiPath) && method === apiMethod) {
        setpendingApiCall(inProgress);
      }
    };

    const registerInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use((request) => {
        const { url, method } = request;

        updateApiCallFor(method, url, true);
        return request;
      });

      responseInterceptor = axios.interceptors.response.use(
        (response) => {
          const { url, method } = response.config;

          updateApiCallFor(method, url, false);
          return response;
        },
        (error) => {
          const { url, method } = error.config;

          updateApiCallFor(method, url, false);
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
  }, [apiPath, apiMethod]);

  return pendingApiCall;
};
