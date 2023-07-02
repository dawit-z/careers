<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear Filters" type="secondary" />
        </div>
      </div>

      <CollapsibleAccordion header="Degree"></CollapsibleAccordion>
      <JobFiltersGroup
        header="Job Types"
        :unique-values="uniqueJobTypes"
        :action="userStore.addSelectedJobTypes"
      />
      <JobFiltersGroup
        header="Organizations"
        :unique-values="uniqueOrganizations"
        :action="userStore.addSelectedOrganizations"
      />
    </section>
  </div>
</template>

<script setup>
import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import JobFiltersGroup from "@/components/JobResults/JobFiltersGroup.vue";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const jobsStore = useJobsStore();
const uniqueOrganizations = computed(() => jobsStore.uniqueOrganizations);
const uniqueJobTypes = computed(() => jobsStore.jobTypes);

const userStore = useUserStore();
</script>
