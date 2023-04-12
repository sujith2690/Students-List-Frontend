import axios from "axios";

export const baseUrl = axios.create({baseURL:process.env.BASE_URL})