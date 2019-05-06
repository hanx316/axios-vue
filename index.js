import axios from 'axios'

export default {
  install(Vue, options = {}) {
    const { globalDefaults = {}, defaults = {}, interceptors = {} } = options

    // init globalDefaults
    // In axios configs, only headers are deep merged. Others (fn or fn array) are replaced with new val.
    for (let key in globalDefaults) {
      if (!globalDefaults.hasOwnProperty(key)) continue
      if (key === 'headers') {
        for (let header in globalDefaults.headers) {
          Object.assign(axios.defaults.headers[header], globalDefaults.headers[header])
        }
      } else {
        axios.defaults[key] = globalDefaults[key]
      }
    }

    // init interceptors
    ;['request', 'requestError', 'response', 'responseError'].forEach(fname => {
      if (typeof interceptors[fname] === 'function') {
        this[`${fname}Interceptor`] = interceptors[fname]
      } else if (/Error/.test(fname)) {
        this[`${fname}Interceptor`] = error => Promise.reject(error)
      } else {
        this[`${fname}Interceptor`] = argument => argument
      }
    })

    // init instance
    const _axios = axios.create(defaults)
    _axios.interceptors.request.use(this.requestInterceptor, this.requestErrorInterceptor)
    _axios.interceptors.response.use(this.responseInterceptor, this.responseErrorInterceptor)

    // set on Vue and Vue instance
    ;[Vue, Vue.prototype].forEach(obj => {
      Object.defineProperties(obj, {
        $axios: {
          value: _axios,
        },
        $http: {
          value: _axios,
        },
      })
    })
  },
}
