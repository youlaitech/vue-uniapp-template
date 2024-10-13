import { getToken, clearToken } from "@/utils/auth";
import { ResultCodeEnum } from "@/enums/ResultCodeEnum";

export default function request<T>(options: UniApp.RequestOptions): Promise<T> {
  // H5 使用 VITE_APP_BASE_API 作为代理路径，其他平台使用 VITE_APP_API_URL 作为请求路径
  let baseApi = import.meta.env.VITE_APP_API_URL;
  // #ifdef H5
  baseApi = import.meta.env.VITE_APP_BASE_API;
  // #endif

  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      url: `${baseApi}${options.url}`,
      header: {
        ...options.header,
        Authorization: getToken() ? `Bearer ${getToken()}` : "", // 添加 Bearer 前缀
      },
      success: (response) => {
        console.log("success response", response);
        const resData = response.data as ResponseData<T>;

        // 业务状态码 00000 表示成功
        if (resData.code === ResultCodeEnum.SUCCESS) {
          resolve(resData.data);
        }
        // 令牌失效或过期处理
        else if (resData.code === ResultCodeEnum.TOKEN_INVALID) {
          uni.showToast({
            title: resData.msg || "令牌无效或过期",
            icon: "none",
            duration: 2000,
          });

          clearToken();

          // 此处不强制跳转到登录页，可以让调用方决定下一步操作
          reject({
            message: resData.msg || "令牌无效或过期",
            code: resData.code,
            action: "TOKEN_INVALID", // 提供一个 action 用于后续调用方判断
          });
        }
        // 其他业务处理失败
        else {
          uni.showToast({
            title: resData.msg || "业务处理失败",
            icon: "none",
            duration: 2000,
          });
          reject({
            message: resData.msg || "业务处理失败",
            code: resData.code,
          });
        }
      },
      fail: (error) => {
        console.log("fail error", error);
        uni.showToast({
          title: "网络请求失败",
          icon: "none",
          duration: 2000,
        });
        reject({
          message: "网络请求失败",
          error,
        });
      },
    });
  });
}
