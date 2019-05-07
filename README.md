# axios-vue

Integrate axios in Vue.js project as a Vue Plugin.

## What and Why?

Tired of integrating axios in Vue.js projects time to time. This plugin package adds axios as a dependency and installed to Vue with some initializations.

## Usage

#### Install

```bash
npm i axios-vue -S
```

#### Init in Vue projects' main or index file

```js
import axiosVue from 'axios-vue'

Vue.use(axiosVue)

// You can also declare global default configs and instance configs in plugin options.
Vue.use(axiosVue, {
  globalDefaults: {
    baseURL: 'https://api.example.com',
    headers: {
      common: {
        Authorization: AUTH_TOKEN
      },
      post: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // ...
    },
    // ...
  },

  default: {
    baseURL: 'https://api.example.com',
    headers: {
      common: {
        Authorization: AUTH_TOKEN
      },
      // ...
    },
    // ...
  },
})

// Two ways for interceptors declaration
axiosVue.requestInterceptor = function(config) {
  return config
}
axiosVue.requestErrorInterceptor = function(error) {
  return Promise.reject(error)
}
axiosVue.responseInterceptor = function(response) {
  return response
}
axiosVue.responseErrorInterceptor = function(error) {
  return Promise.reject(error)
}

// or
Vue.use(axiosVue, {
  interceptors: {
    request(config) {
      return config
    },
    requestError(error) {
      Promise.reject(error)
    },
    response(response) {
      return response
    },
    responseError(error) {
      Promise.reject(error)
    },
  },
})
// If both two ways are used, methods in options will override those outer fns.
// Actually, the four functions above will be set by default in this plugin.
```

#### The usage in Vue components

```js
// Same as axios()
this.$http()
this.$axios()
// Can get axios instance on Vue constructor
Vue.$http()
Vue.$axios()

// Same as methods(get, post, put etc.) on axios
this.$http.get().then()
this.$axios.get().then()
Vue.$http.get().then()
Vue.$axios.get().then()
```
