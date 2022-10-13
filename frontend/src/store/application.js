export default {
  state: {
    label: null,
    isOpenModal:false,
    confidence: null,
    confidence_level: null,
    img: null,
    imgUrl: null,
    resultText: null,
    uploadMessage: null,
    geolocation: null,
    instructionsRead: false,
    needRefresh: false,

  },


  mutations: {
    setStatePopin (state, { popin, open }) {
      state[popin] = open
    },
    setNeedRefresh(state, needRefresh) {
      state.needRefresh = needRefresh
    },
  },

  actions: {
    setStatePopin ({ commit }, { popin, open }) {
      commit('setStatePopin', { popin, open })
    },
    setNeedRefresh ({ commit }, needRefresh) {
      commit('setNeedRefresh', needRefresh)
    },
  },

}