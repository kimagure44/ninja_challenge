export class DataUser {
  constructor (dataUser) {
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
}
