import { createStore } from 'vuex'

import application from './application.js'

const store = createStore({
  modules: {
    application,
  },
})

export default store