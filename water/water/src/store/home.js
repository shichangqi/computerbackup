import {
  getDetails,
  getAddress
} from '@/api'

export default {
  namespaced: true,
  state: {
    details:[],
    Address:[]
  },
  mutations: {
    RECORD_DETAILS: (state, details) => {
      state.details = details
    },
    RECORD_ADDRESS: (state, Address) => {
      state.Address = Address
    },
  },
  actions: {
    async getDetails ({ state, commit }, params) {
      const { data } = await getDetails(params)
      commit('RECORD_DETAILS', data)
    },
    async getAddress ({ state, commit }, params) {
      const { data } = await getAddress(params)
      commit('RECORD_ADDRESS', data)
    },
  },
  getters: {
    
  }
}
