import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const selectedOrganizations = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);

  function loginUser() {
    isLoggedIn.value = true;
  }

  function addSelectedOrganizations(organizations: string[]) {
    selectedOrganizations.value = organizations;
  }

  function addSelectedJobTypes(jobTypes: string[]) {
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
