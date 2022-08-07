export const state = () => ({
  temperatureValues: [],
  pressureValues: [],
  powerValues: [],
  dates: [],
})

export const getters = {
  getHostname(state) {
    return state.value
  },
}

export const mutations = {
  setHostname(state, value) {
    state.value = value
    localStorage.setItem('hostname', value)
  },
  initStorage(state) {
    const hostname = localStorage.getItem('hostname')
    if (hostname) {
      state.value = hostname
    }
    return hostname
  },
  empty(state) {
    state.value = null
    localStorage.clear()
  },
}
