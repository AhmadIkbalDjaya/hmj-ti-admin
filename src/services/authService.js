import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

export const login = async ({ username, password }) => {
  try {
    const response = await apiClient.post("/user/login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.get("/user/logout");

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
