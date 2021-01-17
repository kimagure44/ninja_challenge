export const DataUser = (dataUser) => {
  const {
    id = '',
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
    id,
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

export const DataUserResetValidations = () => ({
  inputFirstname: true,
  inputLastname: true,
  inputEmail: true,
  inputBirthDate: true,
  inputAddressStreet: true,
  inputAddressCity: true,
  inputAddressCountry: true,
  inputAddressPostalcode: true
})
