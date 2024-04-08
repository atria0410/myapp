type User = {
  id: number | null
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
  birthdate: Date
  gender: '1' | '2'
  createdAt: Date
  updatedAt: Date
}

type SortBy = {
  key: string
  order: string
}[]

type Options = {
  page: number
  itemsPerPage: number
  sortBy: SortBy
}

type FormDialogMode = 'new' | 'edit'
