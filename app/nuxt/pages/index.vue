<template>
  <NuxtWelcome />
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/hello')
console.log(data)
</script>
