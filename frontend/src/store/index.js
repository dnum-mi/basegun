import { createStore } from 'vuex'

import snackbar from './snackbar.js'

const store = createStore({
  modules: {
    snackbar,
  },
})

export default store
