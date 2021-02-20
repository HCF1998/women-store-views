// @ts-ignore
import qs from 'qs';
import axios, { AxiosRequestConfig, AxiosInterceptorManager, AxiosPromise, AxiosResponse, AxiosInstance } from 'axios';
import Vue from 'vue';
import {Message} from 'element-ui';

// tslint:disable-next-line:no-shadowed-variable
function instance(config: AxiosRequestConfig = {}) {
  const instance = axios.create({
    // timeout: 10000,
    // withCredentials: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // paramsSerializer: function (params: object) {

    //   let request: string = '';
    //   // 增加请求时间戳
    //   params['_'] = Date.now();
    //   request = qs.stringify(params);
    //   return request;

    // },
    transformRequest: [
      (data) => {
        if (!data || typeof data === 'string') {
          return data;
        }

        // 如果是Form表单就直接跳过JSON转换
        if (data instanceof FormData) {
          return data;
        }

        // 序列化data
        // if (data instanceof Object) {
        //   for (let key in data) {
        //     if (data.hasOwnProperty(key) && !data[key]) {
        //       delete data[key];
        //     }
        //   }
        //   return JSON.stringify(data);
        // }
        // return data;
        return qs.stringify(data, {
          arrayFormat: 'brackets',
          strictNullHandling: false
        });
      }
      // ...(config.transformRequest || [])
    ],
    ...config
  });

  // 处理发送数据到服务器前的一些配置
  // instance.interceptors.request.use(
  //   function(request) {
  //     // 正是部署后增加api开头方便nginx路由配置
  //     // 可考虑增加版本号
  //     if (!/^(https?:)?\/\//.test(request.url) && !/^\/api/.test(request.url)) {
  //       request.url = `/api${request.url}`;
  //     }
  //     // if (!__DEV__) {
  //     //   if (!/^(https?:)?\/\//.test(request.url)) {
  //     //       request.url = `/api${request.url}`;
  //     //   }
  //     // }
  //     // if (request.data && (request.headers['Content-Type'].indexOf('x-www-form-urlencoded') !== -1)) {
  //     //   // request.data = qs.stringify(request.data);
  //     // }

  //     return request;
  //   },
  //   function() {
  //     //
  //   }
  // );

  // 处理接收服务器数据
  instance.interceptors.response.use(
    (response) => {
      if (response.status < 200 || response.status >= 300) {
        return Promise.reject(response.statusText);
      }
      // 服务器没有返回正确的JSON格式
      if (typeof response.data === 'string' && !response.data) {
        //登录信息过期
        if(window.location.pathname.indexOf('management') !== -1 && response.data === ''){
          Message.error('用户不存在!')
          setTimeout(() => {
            window.location.pathname = '/management'
          }, 2000);
        }
        return Promise.reject('服务器没有响应正确的数据, 请检查参数是否正确。');
      }
      return Promise.resolve(response.data);
    },
    (error) => {
      if (error && error.response) {
        return Promise.reject({
          status: error.response.status,
          statusText: error.response.statusText
        });
      } else {
        return Promise.reject({ status: 500, statusText: '服务器故障, 请稍后重试.' });
      }
    }
  );

  return instance as HttpInstance;
}

// 配置到Window全局空间中
// window.http = instance();

function VueHttp(vue: typeof Vue, config?: AxiosRequestConfig) {
  // 调整为单个实例
  const ins = instance(config);
  // @ts-ignore
  if (VueHttp.installed) {
    return;
  }
  // @ts-ignore
  VueHttp.installed = true;

  if (!axios) {
    console.error('You have to install axios');
    return;
  }

  // @ts-ignore
  vue['axios'] = axios;

  // @ts-ignore
  Object.defineProperties(vue.prototype, {
    axios: {
      get() {
        return axios;
      }
    },

    $http: {
      get() {
        return ins;
      }
    }
  });
}

// 可配置的方法
export const Http = instance;
// 默认实例
export const http = instance();
// Vue 插件
export default VueHttp;

export interface HttpInstance {
  (config: AxiosRequestConfig): AxiosPromise;
  (url: string, config?: AxiosRequestConfig): AxiosPromise;
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  request<T = any>(config: AxiosRequestConfig): Promise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
  head(url: string, config?: AxiosRequestConfig): AxiosPromise;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: HttpInstance;
    axios: AxiosInstance;
  }
}

declare global {
  interface Window {
    http: AxiosInstance;
  }
}
