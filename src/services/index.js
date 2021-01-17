export const apiService = {
  BASE_URL: 'http://localhost:8081',
  COUNTRIES_URL: 'https://restcountries.eu/rest/v2/all',
  call: async (url = '', verb = '', params = {}) => {
    const config = {
      method: verb
    }
    if (!['GET', 'DELETE'].includes(verb.toLocaleUpperCase())) {
      config.body = JSON.stringify(params)
    }
    return await (await fetch(url, config)).json()
  }
}
