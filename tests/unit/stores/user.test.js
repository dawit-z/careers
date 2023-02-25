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
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("loginUser", () => {
    it("keeps track of login status", () => {
      const userStore = useUserStore();
      userStore.loginUser();
      expect(userStore.isLoggedIn).toBe(true);
    });
  });
});
