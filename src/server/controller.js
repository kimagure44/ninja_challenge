const fakeData = require('./database')
let database = fakeData()

exports.apiGET = (req, res) => {
  try {
    const {
      query: {
        userId: queryUserId
      },
      params: {
        userId: paramsUserId
      }
    } = req
    const result = database.data.filter(item => queryUserId || paramsUserId ? item.id === parseInt(queryUserId || paramsUserId) : item)
    const hasResult = result.length > 0
    res.status(hasResult ? 200 : 404).send(JSON.stringify(hasResult ? result : { Description: 'USER NOT FOUND', Code: 404 }))
  } catch (err) {
    res.status(400).send(JSON.stringify({ Description: 'BAD REQUEST', Code: 400 }))
  }
}

exports.apiPOST = (req, res) => {
  try {
    const {
      query: {
        form: queryForm = null
      } = {},
      params: {
        form: paramsForm = null
      } = {}
    } = req
    const {
      firstname,
      lastname,
      email,
      birthDate,
      addressStreet,
      addressPostalcode,
      addressCountry,
      addressCity
    } = queryForm && JSON.parse(queryForm) || paramsForm && JSON.parse(paramsForm)
    database.data.push({
      id: database.data.length + 1,
      firstname,
      lastname,
      email,
      birthDate,
      address: {
        id: database.data.length + 1,
        street: addressStreet,
        city: addressCity,
        country: addressCountry,
        postalcode: addressPostalcode
      }
    })
    res.status(201).send(JSON.stringify({ Description: 'CREATED', Code: 201 }))
  } catch (err) {
    res.status(405).send(JSON.stringify({ Description: 'INVALID INPUT', Code: 405 }))
  }
}

exports.apiPUT = (req, res) => {
  try {
    const {
      query: {
        form: queryForm = null
      } = {},
      params: {
        form: paramsForm = null
      } = {}
    } = req
    const {
      id,
      firstname,
      lastname,
      email,
      birthDate,
      addressStreet: street,
      addressPostalcode: postalcode,
      addressCountry: country,
      addressCity: city
    } = queryForm && JSON.parse(queryForm) || paramsForm && JSON.parse(paramsForm)
    const result = database.data.filter((item, index, arr) => {
      if (item.id === parseInt(id)) {
        arr[index] = {
          id,
          firstname,
          lastname,
          email,
          birthDate,
          address: {
            id,
            street,
            city,
            country,
            postalcode
          }
        }
        return item
      }
    })
    const hasResult = result.length > 0
    res.status(hasResult ? 200 : 404).send(JSON.stringify({ Description: hasResult ? 'OK' : 'USER NOT FOUND', Code: hasResult ? 200 : 404 }))
  } catch (err) {
    res.status(400).send(JSON.stringify({ Description: 'BAD REQUEST', Code: 400 }))
  }
};

exports.apiDELETE = (req, res) => {
  try {
    const {
      query: {
        userId: queryUserId
      },
      params: {
        userId: paramsUserId
      }
    } = req
    const {
      id,
    } = queryUserId && JSON.parse(queryUserId) || paramsUserId && JSON.parse(paramsUserId)
    const result = database.data.map((item, index, arr) => {
      if (item.id === parseInt(queryUserId || paramsUserId)) {
        arr.splice(index,1)
        return false
      } else {
        return item
      }
    })
    const hasResult = result.length > 0
    res.status(hasResult ? 200 : 404).send(JSON.stringify({ Description: hasResult ? 'OK' : 'USER NOT FOUND', Code: hasResult ? 200 : 404 }))
  } catch (err) {
    res.status(400).send(JSON.stringify({ Description: 'BAD REQUEST', Code: 400 }))
  }
}