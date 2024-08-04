/*
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-03 23:30:06
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-04 11:46:13
 * @FilePath: \blog-front-vue3\src\utils\http.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE 
 */
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

class MyRequest {
  instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    // 封装拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (err: any) => err
    );
    // 响应拦截器
    this.instance.interceptors.response.use((config) => {
      console.log(config.data);
      return config.data;
    });
  }
  request<T>(conifg: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(conifg)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  put<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
  delete<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  uploadFilePost<T>(config: AxiosRequestConfig): Promise<T> {
    config.headers = { "Content-Type": "multipart/form-data" };
    return this.request<T>({ ...config, method: "POST" });
  }
}

export default MyRequest;
