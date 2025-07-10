import axios, { type AxiosInstance } from 'axios';

let axiosClientInstance: AxiosInstance | null = null;

/**
 * Api client using axios
 * @returns Singleton axios client instance
 */
export const apiClient = (): AxiosInstance => {
  if (!axiosClientInstance) {
    axiosClientInstance = axios.create({
      baseURL: 'server',
      withCredentials: true,
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' },
    });

    axiosClientInstance.interceptors.response.use(
      (response) => {
        return Promise.resolve(response);
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  return axiosClientInstance;
};
