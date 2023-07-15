export const calcAge = (birthdate: Date): number => {
  const today = new Date()
  const birthYear = birthdate.getFullYear()
  const birthMonth = birthdate.getMonth()
  const birthDay = birthdate.getDate()

  let age = today.getFullYear() - birthYear
  const monthDifference = today.getMonth() - birthMonth

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDay)
  ) {
    age--
  }

  return age
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}
