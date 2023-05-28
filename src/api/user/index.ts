// 统一管理咱们项目用户相关的接口
import request from "@/utils/request";
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "./type";

// 项目用户相关的请求地址
enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
}

// 登录接口
export const reqLogin = (data: loginFormData) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data);
};

// 获取用户信息
export const reqUserInfo = () => {
  return request.get<any, userInfoResponseData>(API.USERINFO_URL);
};
