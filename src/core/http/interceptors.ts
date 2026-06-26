import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { storage } from '../../shared/utils/storage';
import { STORAGE_KEYS } from '../../shared/constants/storageKeys';
import { HttpError } from '../../shared/errors/HttpError';

export function setupInterceptors(instance: AxiosInstance): void {
  // Request Interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error: AxiosError) => {
      if (error.response) {
        throw new HttpError(
          (error.response.data as any)?.message || error.message,
          error.response.status,
          'HTTP_ERROR',
          error.response.data
        );
      } else if (error.request) {
        throw new HttpError('Network Error', 0, 'NETWORK_ERROR');
      } else {
        throw new HttpError(error.message, 0, 'UNKNOWN_ERROR');
      }
    }
  );
}
