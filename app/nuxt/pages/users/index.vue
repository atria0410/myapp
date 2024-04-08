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
          <template #item="{ item }">
            <tr>
              <td class="text-left">{{ item.id }}</td>
              <td class="text-left">{{ item.firstName }}</td>
              <td class="text-left">{{ item.lastName }}</td>
              <td class="text-center">{{ item.gender === '1' ? 'male' : 'female' }}</td>
              <td class="text-center">{{ getAgeFromBirthDate(item.birthdate) }}</td>
              <td class="text-center">{{ formatDateTime(item.createdAt) }}</td>
              <td class="text-center">{{ formatDateTime(item.updatedAt) }}</td>
              <td class="text-center"><v-icon @click="clickEdit(item)">mdi-pencil</v-icon></td>
            </tr>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>

    <FormDialog
      v-model="dialog"
      :mode="mode"
      title="User"
      @click:register="registerUser"
      @click:update="updateUser"
      @click:delete="deleteUser"
    >
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
              <DatePicker
                v-model="user.birthdate"
                :rules="rules.birthdate"
                label="Birthdate"
                title="Select Birthdate"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-radio-group v-model="user.gender" label="gender" inline>
              <v-radio label="male" value="1" class="mx-2"></v-radio>
              <v-radio label="female" value="2" class="mx-2"></v-radio>
            </v-radio-group>
          </v-row>
        </v-container>
      </v-form>
    </FormDialog>
  </v-container>
</template>

<script setup lang="ts">
import type { VDataTableServer } from 'vuetify/components'

const headers: VDataTableServer['$props']['headers'] = [
  { title: 'ID', key: 'id', sortable: true, align: 'start' },
  { title: 'First name', key: 'firstName', sortable: true, align: 'start' },
  { title: 'Last name', key: 'lastName', sortable: true, align: 'start' },
  { title: 'Gender', key: 'gender', sortable: true, align: 'center' },
  { title: 'Age', key: 'birthdate', sortable: true, align: 'center' },
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
const mode = ref<FormDialogMode>('new')
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
  mode.value = 'new'
  dialog.value = true
}

const clickEdit = (item: User) => {
  user.value = { ...item }
  mode.value = 'edit'
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
      if (isValidEmail(value)) return true
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
