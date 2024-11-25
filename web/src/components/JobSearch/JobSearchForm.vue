<script setup lang="ts">
import ActionButton from '@/components/Shared/ActionButton.vue'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { number, object, string } from 'yup'

const { t } = useI18n()
const router = useRouter()

interface Person {
  name: string
  age: number
}

interface FormValues {
  role: string
  location: string
  user: Person | null
}

const schema = object({
  role: string().required(),
  location: string().required(),
  user: object({
    name: string(),
    age: number(),
  }).nullable().default(null),
})

const { errors, defineField, handleSubmit } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
})

const [role, roleAttrs] = defineField('role')
const [location, locationAttrs] = defineField('location')
const [userName, userNameAttrs] = defineField('user.name')

const onSubmit = handleSubmit((values) => {
  router.push({
    name: 'JobResults',
    query: {
      role: values.role,
      location: values.location,
    },
  })
})
</script>

<template>
  <form class="flex h-12 w-full items-center rounded-3xl border border-solid border-brand-gray-3">
    <div class="flex flex-col gap-2">
      <label for="role" class="">{{ t('role') }}</label>
      <InputText id="role" v-model="role" :role-attrs placeholder="Software engineer" />
      <small v-if="errors.role" id="role-error">{{ errors.role }}</small>
    </div>

    <div class="flex flex-col gap-2">
      <label for="location" class="">{{ t('where') }}</label>
      <InputText id="location" v-model="location" :invalid="!!errors.location" :location-attrs placeholder="Los Angeles" />
      <small v-if="errors.location" id="location-error">{{ errors.location }}</small>
    </div>

    <div class="flex flex-col gap-2">
      <label for="user" class="">{{ t('where') }}</label>
      <InputText id="user" v-model="userName" :invalid="!!errors.user" :user-name-attrs placeholder="Los Angeles" />
      <small v-if="errors.user" id="user-error">{{ errors.user }}</small>
    </div>

    <ActionButton text="Search" type="secondary" class="rounded-r-3xl" data-test="submit-btn" @click="onSubmit" />
  </form>
</template>
