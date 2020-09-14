import axios from "axios";
import { METHOD } from "./config";
import store from '../store/index'
//高内聚低耦合

//通过配置对象返回一个axios实例对象
const instance = axios.create({
  baseURL: "http://www.hj0819.top:44369",
  timeout: 10000,
}) 
const { baseUrl } = require('../config/env.' + process.env.NODE_ENV);
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  let user = JSON.parse(localStorage.getItem("vuex"));
  // 在发送请求之前做些什么
  if (store.state.token) {
    config.headers.token =store.state.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export function request(method, url, params) {
  switch (method) {
    case METHOD.GET:
      return GET(url, params);
    case METHOD.POST:
      return POST(url, params);
      case METHOD.PATCH:
        return PATCH(url, params);
  }
}

function GET(url, params) {
  //instance.get()函数返回值是Promise对象
  return instance.get(url, params);
}

function POST(url, params) {
  return instance.post(url, params);
}
function PATCH(url, params) {
  return instance.PATCH(url, params);
}

