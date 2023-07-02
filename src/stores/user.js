import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const selectedOrganizations = ref([]);
  const selectedJobTypes = ref([]);

  function loginUser() {
    isLoggedIn.value = true;
  }

  function addSelectedOrganizations(organizations) {
    selectedOrganizations.value = organizations;
  }

  function addSelectedJobTypes(jobTypes) {
    selectedJobTypes.value = jobTypes;
  }

  return {
    isLoggedIn,
    selectedJobTypes,
    selectedOrganizations,
    loginUser,
    addSelectedJobTypes,
    addSelectedOrganizations,
  };
});
