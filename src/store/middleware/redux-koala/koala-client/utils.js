import qs from 'query-string'

export const getCredentials = () => {
  const username = localStorage.getItem('koala|username')
  const token = localStorage.getItem('koala|token')

  return {
    username: username || '',
    isFirstLoad: username === null,
    token: token || ''
  }
}

export const setCredentials = ({username, token}) => {
  localStorage.setItem('koala|username', username)
  localStorage.setItem('koala|token', token)
  return {username, token}
}

export const parseUrlHash = () => {
  return qs.parse(window.location.hash)
}

export const clearUrlHash = () => {
  window.location.hash = ''
}
