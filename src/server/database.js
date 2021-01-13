const faker = require('faker');
const database = () => {
    let data = [];
    const dateOptions = {
      year: 'numeric',
      day: '2-digit',
      month: '2-digit'
    };
    for (let id = 0; id < 1000; id++) {
      const [month, day, year] = Intl.DateTimeFormat('en-US', dateOptions).format(faker.date.past()).split('/');
      data.push({
        id,
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        birthDate: `${year}-${month}-${day}`,
        address: {
          id,
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          country: faker.address.countryCode(),
          postalcode: faker.address.zipCode()
        }
      });
    }
    return { data }
}
module.exports = database;