import axios from 'axios'
import { Message } from 'iview'
import router from '../router'

axios.interceptors.request.use(config => {
  return config
}, err => {
  Message.error({ message: '请求超时!' })
  return Promise.resolve(err)
})
axios.interceptors.response.use(data => {
  // if (data.status && data.status === 200 && data.data === null) {
  //   Message.error('登录超时')
  //   router.push('/')
  //   throw new Error('请重新登录')
  // } else
  if (data.status && data.status === 200 && data.data.success === false) {
    Message.error(data.data.msg)
    return data
  }
  return data
}, err => {
  if (err.response.status === 400) {
    console.log(400)
    // Message.error(err.response.data.msg)
    Message.error({
      content: err.response.data.msg,
      duration: 5
    })
    return err.response
  } else if (err.response.status === 404) {
    localStorage.removeItem('username')
    Message.error('登录超时')
    router.push('/')
    throw new Error('请重新登录')
  } else if (err.response.status === 500) {
    Message.error('服务异常')
  } else {
    Message.error('服务异常')
  }
  return Promise.resolve(err)
})

let base = ''

export const $post = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    responseType: 'json',
    withCredentials: true,
    maxRedirects: 0,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const $put = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    responseType: 'json',
    withCredentials: true,
    maxRedirects: 0,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const $delete = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    responseType: 'json',
    withCredentials: true,
    maxRedirects: 0
  }
  )
}
export const $get = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    responseType: 'json',
    withCredentials: true,
    maxRedirects: 0
  })
}
export const $upload = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
