import dayjs from 'dayjs'

/**
 * Format a date object to YYYYY/MM/DD
 * @param date Date
 * @returns YYYYY/MM/DD
 */
export const formatDate = (date: Date): string => {
  return dayjs(date).format('YYYY/MM/DD')
}

/**
 * Format a date object to YYYYY/MM/DD HH:mm:ss
 * @param date Date
 * @returns YYYY/MM/DD HH:mm:ss
 */
export const formatDateTime = (date: Date): string => {
  return dayjs(date).format('YYYY/MM/DD HH:mm:ss')
}

/**
 * get Age From birthdate
 * @param birthdate Date
 * @returns age
 */
export const getAgeFromBirthDate = (birthdate: Date): number => {
  return dayjs().diff(dayjs(birthdate), 'year')
}

/**
 * Determine if it is a valid e-mail address
 * @param email string
 * @returns true if valid
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/
  return regex.test(email)
}
