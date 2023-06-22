<template>
  <TheMainNav />
  <router-view />
</template>

<script>
import TheMainNav from "@/components/Navigation/TheMainNav.vue";

export default {
  name: "App",
  components: {
    TheMainNav,
  },
};
</script>
