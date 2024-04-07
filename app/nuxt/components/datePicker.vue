<template>
  <v-menu v-model="isCalendarOpen" :close-on-content-click="false">
    <template #activator="{ props: p }">
      <v-text-field
        v-bind="p"
        :model-value="dateFormat"
        :rules="rules"
        :label="label"
        prepend-inner-icon="mdi-calendar"
        readonly
        :clearable="clearable"
        @click:clear="clickClear"
      />
    </template>
    <v-locale-provider :locale="locale">
      <v-date-picker v-model="date" :title="title" :color="color" elevation="24" @update:model-value="changeDate" />
    </v-locale-provider>
  </v-menu>
</template>

<script setup lang="ts">
import type { VTextField } from 'vuetify/components'
import dayjs from 'dayjs'

interface Props {
  label?: string
  title?: string
  color?: string
  format?: string
  clearable?: boolean
  locale?: string
  rules: VTextField['$props']['rules']
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  title: 'SELECT DATE',
  color: 'primary',
  format: 'YYYY/MM/DD',
  clearable: true,
  locale: 'en'
})

const date = defineModel<Date>()
const dateFormat = computed(() => (date.value ? dayjs(date.value).format(props.format) : ''))

const isCalendarOpen = ref<boolean>(false)

const changeDate = () => {
  isCalendarOpen.value = false
}

const clickClear = () => {
  date.value = undefined
}
</script>

<style lang="scss">
.v-overlay__content {
  min-width: 0 !important;
}
</style>
