import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const selectedOrganizations = ref<Array<string>>([])
  const selectedJobTypes = ref<Array<string>>([])
  const selectedDegrees = ref<Array<string>>([])

  function loginUser() {
    isLoggedIn.value = true
  }

  function addSelectedOrganizations(organizations: Array<string>) {
    selectedOrganizations.value = organizations
  }

  function addSelectedJobTypes(jobTypes: Array<string>) {
    selectedJobTypes.value = jobTypes
  }

  function addSelectedDegrees(degrees: Array<string>) {
    selectedDegrees.value = degrees
  }

  function clear() {
    selectedDegrees.value = []
    selectedJobTypes.value = []
    selectedOrganizations.value = []
  }

  return {
    isLoggedIn,
    selectedJobTypes,
    clear,
    selectedOrganizations,
    selectedDegrees,
    loginUser,
    addSelectedJobTypes,
    addSelectedOrganizations,
    addSelectedDegrees,
  }
})
