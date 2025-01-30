import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

export const simulacionesApi = axios.create({
  baseURL: `${VITE_API_URL}/simulacion`,
});