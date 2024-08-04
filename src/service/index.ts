import MyRequest from "@/utils/http";

export default new MyRequest({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});
