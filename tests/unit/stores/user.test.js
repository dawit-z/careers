import { createPinia, setActivePinia } from "pinia";
import { useUserStore } from "@/stores/user";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track of login status", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("keeps track of selected organizations", () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("loginUser", () => {
    it("keeps track of login status", () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("addSelectedOrganization", () => {
    it("updates orgs that user has selected to filter by", () => {
      const store = useUserStore();
      store.addSelectedOrganization(["Org1", "Org2"]);
      expect(store.selectedOrganizations).toEqual(["Org1", "Org2"]);
    });
  });
});
