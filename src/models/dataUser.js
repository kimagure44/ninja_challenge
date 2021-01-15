export const DataUser = (dataUser) => {
  const {
    addressCity = '',
    addressCountry = '',
    addressPostalcode = '',
    addressStreet = '',
    birthDate = '',
    email = '',
    firstname = '',
    lastname = ''
  } = dataUser
  return {
    addressCity,
    addressCountry,
    addressPostalcode,
    addressStreet,
    birthDate,
    email,
    firstname,
    lastname
  }
}
