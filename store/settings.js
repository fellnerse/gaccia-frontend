import { RequestStatus } from '~/code/enums'

export const state = () => ({
  PIDStatus: null,
  requestState: RequestStatus.SUCCESSFUL,
  errorMessage: null,
})

export const getters = {
  getPIDStatus(state) {
    return state.PIDStatus
  },
}

async function sendSettings(hostname, settings = {}) {
  const url = `http://${hostname}/post?${new URLSearchParams(settings)}`
  console.log('settings url request', url)
  return await fetch(url, {
    method: 'POST',
  })
}

export const mutations = {
  setPIDStatus(state, value) {
    state.PIDStatus = value
  },
  setRequestState(state, value) {
    state.requestState = value
  },
  setErrorMessage(state, value) {
    state.errorMessage = value
  },
}
export const actions = {
  async togglePIDStatus({ state, rootState, commit }) {
    commit('setRequestState', RequestStatus.RUNNING)
    try {
      const result = await sendSettings(rootState.hostname.value, {
        varPID_ON: state.PIDStatus,
      })
      if (result.ok) {
        commit('setPIDStatus', !state.PIDStatus)
        commit('setRequestState', RequestStatus.SUCCESSFUL)
      } else {
        commit('setRequestState', RequestStatus.FAILED)
        commit('setErrorMessage', result.text())
      }
    } catch (e) {
      commit('setRequestState', RequestStatus.FAILED)
      commit('setErrorMessage', e)
    }
  },
}
