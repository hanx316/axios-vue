# axios-vue

Integrate axios in Vue.js project as a Vue Plugin.

## What and Why?

Tired of integrating axios in Vue.js projects time to time. This plugin package adds axios as a dependency and installed to Vue with some initializations.

## Usage

#### Install

```bash
npm i axios-vue -S
```

#### Use in Vue projects' main or index file

```js
import axiosVue from 'axios-vue'

Vue.use(axiosVue)

// You can also declare global default configs and instance configs in plugin options
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
  }.
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
axiosVue.responseInterceptor = function(config) {
  return config
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
    response(config) {
      return config
    },
    responseError(error) {
      Promise.reject(error)
    },
  },
})
// If both two ways are used, methods in options will override.
// Actually, the four functions above will be set by default in this plugin.
```
