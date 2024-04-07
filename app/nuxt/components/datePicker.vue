<template>
  <v-menu v-model="isCalendarOpen" :close-on-content-click="false">
    <template #activator="{ props }">
      <v-text-field
        v-bind="props"
        v-model="date"
        :label="label"
        :clearable="clearable"
        prepend-inner-icon="mdi-calendar"
        readonly
      />
    </template>
    <v-date-picker v-model="date" elevation="24" @update:model-value="changeDate" />
  </v-menu>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  clearable?: boolean
}

withDefaults(defineProps<Props>(), {
  label: '',
  clearable: true
})

const date = defineModel<Date>()

const isCalendarOpen = ref<boolean>(false)

const changeDate = () => {
  isCalendarOpen.value = false
}
</script>

<style lang="scss">
.v-overlay__content:has(> .v-date-picker) {
  min-width: 0 !important;
}
</style>
