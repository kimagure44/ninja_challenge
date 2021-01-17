export const Utils = {
  isEmpty: (data) => data.trim().length === 0,
  isEmail: (data) => /\S+@\S+\.\S+/.test(data),
  dateFormat: (data) => data.split('/').reverse().join('/'),
  maxLength: (evt, length) => evt.target.value.length >= length && evt.preventDefault()
}
