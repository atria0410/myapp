<template>
  <v-container>
    <v-data-table-server
      :headers="headers"
      :items="users"
      :items-length="totalUsers"
      :loading="loading"
      @update:options="loadUsers"
    >
      <template #[`item.actions`]>
        <v-icon @click="handleClickEdit">mdi-pencil</v-icon>
      </template>
    </v-data-table-server>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card title="User">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field v-model="user.firstName" label="First Name" />
            </v-col>
            <v-col>
              <v-text-field v-model="user.lastName" label="Last Name" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="user.email" label="Email" type="email" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="user.password" label="Password" type="password" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="user.passwordConfirmation" label="password confirmation" type="password" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <DatePicker v-model="user.birthdate" label="Birthdate" />
            </v-col>
          </v-row>
          <v-row>
            <v-radio-group v-model="user.gender" label="gender" inline>
              <v-radio label="male" value="1" class="mx-2"></v-radio>
              <v-radio label="female" value="2" class="mx-2"></v-radio>
            </v-radio-group>
          </v-row>
        </v-container>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn @click="closeDialog">Cancel</v-btn>
          <v-btn color="success" @click="registerUser">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    {{ user }}
  </v-container>
</template>

<script setup lang="ts">
import type { VDataTableServer } from 'vuetify/components'

type User = {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
  birthdate: Date
  gender: string
}

const headers: VDataTableServer['$props']['headers'] = [
  {
    title: 'ID',
    key: 'id',
    sortable: true,
    align: 'start'
  },
  {
    title: 'First name',
    key: 'firstName',
    sortable: true,
    align: 'start'
  },
  {
    title: 'Last name',
    key: 'lastName',
    sortable: true,
    align: 'start'
  },
  {
    title: 'Birthdate',
    key: 'birthdate',
    sortable: true,
    align: 'center'
  },
  {
    title: 'Gender',
    key: 'gender',
    sortable: true,
    align: 'center'
  },
  {
    title: 'Created at',
    key: 'createdAt',
    sortable: true,
    align: 'center'
  },
  {
    title: 'Updated at',
    key: 'updatedAt',
    sortable: true,
    align: 'center'
  },
  { title: 'Actions', key: 'actions', sortable: false, align: 'center' }
]

const userDefault = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  birthdate: new Date(),
  gender: '1'
}

const users = ref<VDataTableServer['$props']['items']>([])
const totalUsers = ref<VDataTableServer['$props']['itemsLength']>(0)
const loading = ref<VDataTableServer['$props']['loading']>(false)
const dialog = ref<boolean>(false)
const user = ref<User>(userDefault)

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

  users.value = response.users.map((user: any) => {
    user.gender = user.gender === '1' ? 'male' : 'female'
    return user
  })
  totalUsers.value = response.totalLength
  loading.value = false
}

const handleClickNew = () => {
  dialog.value = true
}

const handleClickEdit = () => {
  dialog.value = true
}

const registerUser = () => {
  dialog.value = false
}

const closeDialog = () => {
  dialog.value = false
}
</script>
