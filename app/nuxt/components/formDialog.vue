<template>
  <v-dialog v-model="dialog" persistent :max-width="maxWidth">
    <v-card :title="title">
      <slot />
      <v-divider />
      <v-card-actions>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-spacer />
        <template v-if="mode === 'new'">
          <v-btn color="success" @click="emit('click:register')">Register</v-btn>
        </template>
        <template v-else>
          <v-btn color="success" @click="emit('click:update')">Update</v-btn>
          <v-btn color="red" @click="emit('click:delete')">Delete</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
interface Props {
  mode: FormDialogMode
  title?: string
  maxWidth?: number
}

withDefaults(defineProps<Props>(), {
  title: '',
  maxWidth: 500
})

const dialog = defineModel<boolean>()

const emit = defineEmits<{
  (e: 'click:register'): void
  (e: 'click:update'): void
  (e: 'click:delete'): void
}>()

const closeDialog = () => {
  dialog.value = false
}
</script>
