import axios from 'axios'


axios.defaults.withCredentials = true

const Service = axios.create({
  baseURL: 'http://localhost:3000'
});


// 封装错误处理
// function handerError(error) {
//     if (error.response) {
//         Promise.reject({
//             data: error.response.data,
//             code: 10000,
//             msg: '请求错误'
//         })
//     }
//     else if()
// }

// get请求
export const get = (url, params) => {
  if (!params) params = {}
  return Service.get(url, { params })
    .then(res => res.data)
    .catch(error => console.log(error))
}