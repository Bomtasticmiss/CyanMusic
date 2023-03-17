import axios from 'axios'


axios.defaults.withCredentials = true

const Service = axios.create({
  baseURL: 'http://localhost:3000'
  // baseURL: 'https://cyanmaster.top'

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
  // params.realIP = getRealIP()
  // getRealIP()
  return Service.get(url, {params})
    .then(res => res.data)
    .catch(error => console.log(error))
}



// export const getIp = () => axios.get('https://cyanmaster.top')


// const getRealIP = async () => {
//   try {
//     const res = await getIp()
//     // let arr = res.data.match(/[0-9]+(\.[0-9]+)+/)
//     console.log(res);

//     // return arr ? arr[0] : ''
//     // commit('setIp', ip)
//   } catch (error) {
//     console.log(error);
//   }
// }