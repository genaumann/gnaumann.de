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
