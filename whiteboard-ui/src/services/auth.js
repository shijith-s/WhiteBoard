import routes from "./routes";
import axios from "axios";

const signup = async (payload) => {
  const response = await axios.post(routes.signup, payload);
  return response.data;
};

const login = async (payload) => {
  const response = await axios.post(routes.login, payload);
  return response.data;
};

export { signup, login };
