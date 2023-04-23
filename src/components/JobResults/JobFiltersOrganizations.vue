<template>
  <CollapsibleAccordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="org in uniqueOrganizations" :key="org" class="h-8 w-1/2">
            <input
              :id="org"
              v-model="selectedOrganizations"
              :value="org"
              type="checkbox"
              class="mr-3"
              @change="addSelectedOrganization(selectedOrganizations)"
            />
            <label :for="org">{{ org }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/stores/user";
import { useJobsStore } from "@/stores/jobs";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "JobFiltersOrganizations",
  components: { CollapsibleAccordion },
  data: () => ({
    selectedOrganizations: [],
  }),
  computed: {
    ...mapState(useJobsStore, ["uniqueOrganizations"]),
  },
  methods: {
    ...mapActions(useUserStore, ["addSelectedOrganization"]),
  },
};
</script>
