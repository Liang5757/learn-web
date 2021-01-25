import axios from 'axios'

export function fetchData () {
  return axios.get('http://localhost:3000/');
}
