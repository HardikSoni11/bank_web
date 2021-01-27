import axios from "axios";

export default axios.create({
  baseURL: "https://bank-fyle-api.herokuapp.com",
  headers: {
    "Content-type": "application/json",
    "Allow-Access-Control-Origin": "*",
  },
});
