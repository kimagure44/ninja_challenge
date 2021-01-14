export const apiService = {
  BASEURL: 'http://localhost:8081',
  get: async (url) => await (await fetch(url)).json()
}
