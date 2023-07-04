import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const selectedOrganizations = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);
  const selectedDegrees = ref<string[]>([]);

  const loginUser = () => {
    isLoggedIn.value = true;
  };

  function addSelectedOrganizations(organizations: string[]) {
    selectedOrganizations.value = organizations;
  }

  function addSelectedJobTypes(jobTypes: string[]) {
    selectedJobTypes.value = jobTypes;
  }

  function addSelectedDegrees(selectedDegrees: string[]) {
    selectedJobTypes.value = selectedDegrees;
  }

  const clear = () => {
    selectedDegrees.value = [];
    selectedJobTypes.value = [];
    selectedOrganizations.value = [];
  };

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
  };
});
