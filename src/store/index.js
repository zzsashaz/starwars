import axios from "axios";
import { message } from "ant-design-vue";
const axiosConfig = {
  baseURL: process.env.VUE_APP_BASE_URL,
};
export const axiosApp = axios.create(axiosConfig);
axiosApp.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    message.error("Что-то пошло не так. Ошибка сервера!");
    return Promise.reject(error);
  }
);
