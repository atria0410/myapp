<template>
  <v-container>
    <v-row>
      <v-col class="text-right">
        <v-btn color="primary" variant="outlined" @click="clickNew">New User</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table-server
          :headers="headers"
          :items="users"
          :items-length="totalUsers"
          :loading="loading"
          @update:options="loadUsers"
        >
          <template #[`item.gender`]="{ item }">
            {{ item.gender === '1' ? 'male' : 'female' }}
          </template>
          <template #[`item.birthdate`]="{ item }">
            {{ dayjs(item.birthdate).format('YYYY/MM/DD') }}
          </template>
          <template #[`item.createdAt`]="{ item }">
            {{ dayjs(item.createdAt).format('YYYY/MM/DD HH:mm:ss') }}
          </template>
          <template #[`item.updatedAt`]="{ item }">
            {{ dayjs(item.updatedAt).format('YYYY/MM/DD HH:mm:ss') }}
          </template>
          <template #[`item.actions`]="{ item }">
            <v-icon @click="clickEdit(item)">mdi-pencil</v-icon>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card title="User">
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field v-model="user.firstName" :rules="rules.firstName" label="First name" />
              </v-col>
              <v-col>
                <v-text-field v-model="user.lastName" :rules="rules.lastName" label="Last name" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="user.email" :rules="rules.email" label="Email" type="email" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="user.password" :rules="rules.password" label="Password" type="password" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.passwordConfirmation"
                  :rules="rules.passwordConfirmation"
                  label="Password confirmation"
                  type="password"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <DatePicker v-model="user.birthdate" :rules="rules.birthdate" label="Birthdate" />
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
            <v-btn @click="closeDialog">Cancel</v-btn>
            <v-spacer />
            <template v-if="user.id === null">
              <v-btn color="success" @click="registerUser">Register</v-btn>
            </template>
            <template v-else>
              <v-btn color="success" @click="updateUser">Update</v-btn>
              <v-btn color="red" @click="deleteUser">Delete</v-btn>
            </template>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import type { VDataTableServer } from 'vuetify/components'
import dayjs from 'dayjs'

const headers: VDataTableServer['$props']['headers'] = [
  { title: 'ID', key: 'id', sortable: true, align: 'start' },
  { title: 'First name', key: 'firstName', sortable: true, align: 'start' },
  { title: 'Last name', key: 'lastName', sortable: true, align: 'start' },
  { title: 'Gender', key: 'gender', sortable: true, align: 'center' },
  { title: 'birthdate', key: 'birthdate', sortable: true, align: 'center' },
  { title: 'Created at', key: 'createdAt', sortable: true, align: 'center' },
  { title: 'Updated at', key: 'updatedAt', sortable: true, align: 'center' },
  { title: 'Actions', key: 'actions', sortable: false, align: 'center' }
]

const userDefault = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  birthdate: new Date(),
  gender: '1'
} as User

const user = ref<User>(userDefault)
const users = ref<User[]>([])
const totalUsers = ref<number>(0)
const loading = ref<boolean>(false)
const dialog = ref<boolean>(false)
const form = ref()

let options: Options = { page: 1, itemsPerPage: 10, sortBy: [] }

const loadUsers = async ({ page, itemsPerPage, sortBy }: Options) => {
  loading.value = true

  options = { ...{ page, itemsPerPage, sortBy } }

  const response = await $fetch('/api/users', {
    method: 'GET',
    params: {
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      sortKey: sortBy[0]?.key,
      sortOrder: sortBy[0]?.order
    }
  })
  users.value = response.users.map((user: User) => {
    user.birthdate = new Date(user.birthdate as Date)
    user.createdAt = new Date(user.createdAt as Date)
    user.updatedAt = new Date(user.updatedAt as Date)
    return user
  })
  totalUsers.value = response.totalLength
  loading.value = false
}

const clickNew = () => {
  user.value = { ...userDefault }
  dialog.value = true
}

const clickEdit = (item: User) => {
  user.value = { ...item }
  dialog.value = true
}

const registerUser = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  await $fetch('/api/users', {
    method: 'POST',
    body: user.value
  })
  loadUsers(options)
  closeDialog()
}

const updateUser = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  await $fetch(`/api/users/${user.value.id}`, {
    method: 'PUT',
    body: user.value
  })
  loadUsers(options)
  closeDialog()
}

const deleteUser = async () => {
  await $fetch(`/api/users/${user.value.id}`, {
    method: 'DELETE'
  })
  loadUsers(options)
  closeDialog()
}

const closeDialog = () => {
  dialog.value = false
}

const rules = {
  firstName: [
    (value: string) => {
      if (value) return true
      return 'You must enter a first name.'
    }
  ],
  lastName: [
    (value: string) => {
      if (value) return true
      return 'You must enter a last name.'
    }
  ],
  email: [
    (value: string) => {
      if (value) return true
      return 'You must enter a email.'
    },
    (value: string) => {
      const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/
      if (regex.test(value)) return true
      return 'Invalid e-mail address..'
    }
  ],
  password: [
    (value: string) => {
      if (value) return true
      return 'You must enter a password.'
    }
  ],
  passwordConfirmation: [
    (value: string) => {
      if (value === user.value.password) return true
      return 'Password does not match.'
    }
  ],
  birthdate: [
    (value: string) => {
      if (value) return true
      return 'You must enter a birthdate.'
    }
  ]
}
</script>
