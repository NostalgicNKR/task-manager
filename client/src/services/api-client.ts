import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  total: number;
  page: number;
  pageSize: number;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: "http://192.168.139.137:3500/api",
});

axiosInstance.interceptors.request.use((config) => {
  let token = localStorage.getItem("x-auth-token");
  config.headers["x-auth-token"] = token;
  return config;
});

class APIClient<T, U = void> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  get = () => axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
  post = (data: U) =>
    axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  delete = (id: string) =>
    axiosInstance.delete<T>(this.endpoint + "/" + id).then((res) => res.data);
  put = (data: T) =>
    axiosInstance.put<T>(this.endpoint, data).then((res) => res.data);
}

export default APIClient;
