import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    selectedOrganizations: [],
    selectedJobTypes: [],
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    addSelectedOrganization(organizations) {
      this.selectedOrganizations = organizations;
    },
    addSelectedJobTypes(selectedJobTypes) {
      this.selectedJobTypes = selectedJobTypes;
    },
  },
});
