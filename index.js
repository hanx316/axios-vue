import axios from 'axios'

export default {
  install(Vue, options) {
    const { globalDefaults = {}, defaults = {}, interceptors = {} } = options

    // init globalDefaults
    const objectDefaults = /^(common|get|post|put|delete|head|patch)$/
    for (let key in globalDefaults) {
      const val = globalDefaults[key]
      if (objectDefaults.test(key)) {
        axios.defaults[key] = { ...axios.defaults[key], ...val }
      } else {
        axios.defaults[key] = val
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
