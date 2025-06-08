import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
export const interceptorRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    if (config.method?.toUpperCase() === 'GET' || config.url?.includes('sanctum/csrf-cookie')) {
      return config;
    }
  
    const csrfToken = document.cookie
      .split('; ')
      .find((row: string) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];
  
    if (csrfToken) {
      config.headers.set('X-XSRF-TOKEN', decodeURIComponent(csrfToken));
    } else {
      await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/sanctum/csrf-cookie`, {
        withCredentials: true
      });
      const newCsrfToken = document.cookie
        .split('; ')
        .find((row: string) => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
      if (newCsrfToken) {
        config.headers.set('X-XSRF-TOKEN', decodeURIComponent(newCsrfToken));
      }
    }
  
    return config;
  };
  
  export const interceptorResponse = {
    onFulfilled: (response: AxiosResponse): AxiosResponse => response,
    onRejected: async (error: AxiosError): Promise<AxiosResponse | PromiseRejectedResult> => {
      if (error.response?.status === 419) {
        try {
          await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/sanctum/csrf-cookie`, {
            withCredentials: true
          });
          
          const csrfToken = document.cookie
            .split('; ')
            .find((row: string) => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
          
          if (csrfToken && error.config) {
            const newConfig = {
              ...error.config,
              headers: {
                ...error.config.headers,
                'X-XSRF-TOKEN': decodeURIComponent(csrfToken)
              }
            };
            
            return api.request(newConfig);
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  };