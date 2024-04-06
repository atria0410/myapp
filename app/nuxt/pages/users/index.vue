<template>
  <v-container>
    <v-data-table-server
      :headers="headers"
      :items="users"
      :items-length="totalUsers"
      :loading="loading"
      @update:options="loadUsers"
    />
  </v-container>
</template>

<script setup lang="ts">
import type { VDataTableServer } from 'vuetify/components'

const headers: VDataTableServer['$props']['headers'] = [
  {
    title: 'first name',
    align: 'start',
    sortable: true,
    key: 'firstName'
  },
  {
    title: 'last name',
    align: 'start',
    sortable: true,
    key: 'lastName'
  },
  {
    title: 'birthdate',
    align: 'center',
    sortable: true,
    key: 'birthdate'
  },
  {
    title: 'created at',
    align: 'center',
    sortable: true,
    key: 'createdAt'
  },
  {
    title: 'updated at',
    align: 'center',
    sortable: true,
    key: 'updatedAt'
  }
]

const users = ref<VDataTableServer['$props']['items']>([])
const totalUsers = ref<VDataTableServer['$props']['itemsLength']>(0)
const loading = ref<VDataTableServer['$props']['loading']>(false)

const loadUsers = async ({ page, itemsPerPage, sortBy }: any) => {
  loading.value = true

  const response = await $fetch('/api/users', {
    method: 'GET',
    params: {
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      sortKey: sortBy[0]?.key,
      sortOrder: sortBy[0]?.order
    }
  })

  users.value = response.users
  totalUsers.value = response.totalLength
  loading.value = false
}
</script>
