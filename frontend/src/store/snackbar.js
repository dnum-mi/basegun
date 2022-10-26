const defaultTimeout = 3000

export default {
  state: {
    message: undefined,
    messages: undefined,
    show: false,
    type: undefined,
    timeoutId: undefined,
  },

  mutations: {
    setMessage (state, { message, messages, type = 'info' }) {
      state.message = message
      state.messages = messages
      state.show = true
      state.type = type
    },
    hideMessage (state) {
      state.show = false
    },
    setTimeoutId (state, timeoutId) {
      state.timeoutId = timeoutId
    },
  },

  actions: {
    setMessage ({ commit, state }, { message, messages, timeout, type }) {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
        commit('setTimeoutId', undefined)
      }
      commit('setMessage', { message, messages, type })
      if (state.type !== 'error') {
        const timeoutId = setTimeout(() => commit('hideMessage'), timeout || defaultTimeout)
        commit('setTimeoutId', timeoutId)
      }
    },

    hideMessage ({ commit }) {
      commit('hideMessage')
    },
  },
}