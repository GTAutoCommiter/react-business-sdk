import axios, { AxiosInstance } from 'axios';
import { SDKConfig } from '../config/SDKConfig';
import { HttpClient } from './types';
import { setupInterceptors } from './interceptors';

export function createHttpClient(config: SDKConfig): HttpClient {
  const instance: AxiosInstance = axios.create({
    baseURL: config.baseURL,
    ...(config.timeout !== undefined ? { timeout: config.timeout } : {}),
    ...(config.headers ? { headers: config.headers } : {}),
  });

  setupInterceptors(instance);

  return {
    get: <T>(url: string, config?: any) => instance.get<any, T>(url, config),
    post: <T>(url: string, data?: any, config?: any) => instance.post<any, T>(url, data, config),
    put: <T>(url: string, data?: any, config?: any) => instance.put<any, T>(url, data, config),
    delete: <T>(url: string, config?: any) => instance.delete<any, T>(url, config),
    patch: <T>(url: string, data?: any, config?: any) => instance.patch<any, T>(url, data, config),
  };
}
