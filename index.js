import axios from 'axios'

export default {
  install(Vue, { configs = {}, interceptors = {} } = {}) {
    const FN = 'function'
    const { request, requestError, response, responseError } = interceptors
    const requestInterceptor = typeof request === FN || this._requestInterceptor
    const requestErrorInterceptor = typeof requestError === FN || this._requestErrorInterceptor
    const responseInterceptor = typeof response === FN || this._responseInterceptor
    const responseErrorInterceptor = typeof responseError === FN || this._responseErrorInterceptor

    const _axios = this._axios = axios.create(configs)
    this._axios.interceptors.request.use(requestInterceptor, requestErrorInterceptor)
    this._axios.interceptors.response.use(responseInterceptor, responseErrorInterceptor)

    Vue.prototype.$axios = _axios
    Vue.prototype.$http = {
      get(url, query, option = {}) {
        return _axios({
          ...option,
          ...{
            method: 'GET',
            url,
            params: query
          },
        })
      },
      post(url, body, option = {}) {
        return _axios({
          ...option,
          ...{
            method: 'POST',
            url,
            data: body,
            headers: { 'Content-Type': 'application/json' },
          },
        })
      },
      put(url, body, option = {}) {
        return _axios({
          ...option,
          ...{
            method: 'PUT',
            url,
            data: body,
            headers: { 'Content-Type': 'application/json' },
          },
        })
      },
      delete(url, option = {}) {
        return _axios({
          ...option,
          ...{
            method: 'DELETE',
            url,
          }
        })
      }
    }
  },

  _axios: null,

  _requestInterceptor: config => config,

  _requestErrorInterceptor: error => Promise.reject(error),

  _responseInterceptor: response => response,

  _responseErrorInterceptor: error => Promise.reject(error),
}
