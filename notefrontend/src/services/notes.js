import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/notes'
// const baseUrl = 'https://notes-app2022.fly.dev/api/notes'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  // const request = axios.post(baseUrl, newObject)
  // return request.then(response => response.data)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// eslint-disable-next-line
export default { getAll, create, update, setToken }