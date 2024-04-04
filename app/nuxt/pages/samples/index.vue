<template>
  <div class="container">
    <h1>Hello World</h1>
    <MyButton color="#27acd9" @click="countUp">Click Me!</MyButton>
    <p class="count">{{ count }}</p>
  </div>
</template>

<script setup lang="ts">
const count = ref<number>(0)

const countUp = () => {
  count.value++
}
</script>

<style scoped lang="scss">
.container {
  margin: 20px;
  text-align: center;
}
.count {
  margin: 5px;
  font-size: 2rem;
}
</style>
