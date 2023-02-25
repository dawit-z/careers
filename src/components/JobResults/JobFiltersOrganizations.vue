<template>
  <CollapsibleAccordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="org in uniqueOrganizations" :key="org" class="h-8 w-1/2">
            <input :id="org" type="checkbox" class="mr-3" />
            <label :for="org">{{ org }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script>
import { mapGetters } from "pinia";
import { useJobsStore } from "@/stores/jobs";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "JobFiltersOrganizations",
  components: { CollapsibleAccordion },
  computed: {
    ...mapGetters(useJobsStore, ["uniqueOrganizations"]),
  },
};
</script>
