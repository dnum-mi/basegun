import { createStore } from 'vuex'

import application from './application.js'
import snackbar from './snackbar.js'

const store = createStore({
  modules: {
    application,
    snackbar,
  },
})

export default store