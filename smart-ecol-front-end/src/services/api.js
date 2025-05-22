import axios from "axios";

const instance = axios.create({
  baseUrl: "http://localhost:8000",
  headrers : {
    "Content-Type": "application/json",
  },
  withCredebtials: true,
});

export default instance;