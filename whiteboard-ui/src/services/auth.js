import routes from "./routes";
import apiClient from "./axios";

const signup = async (payload) => {
  const response = await apiClient.post(routes.signup, payload);
  return response.data;
};

const login = async (payload) => {
  const response = await apiClient.post(routes.login, payload);
  return response.data;
};

export { signup, login };
