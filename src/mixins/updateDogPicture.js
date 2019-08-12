import axios from "axios";

export default (url) => {
    return axios.get(url)
    .then(response => {
      return response.data
    })
    .catch(e => {
      console.log(e);
    })
}