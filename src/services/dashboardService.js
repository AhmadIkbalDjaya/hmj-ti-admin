import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

export const getDashboardSummary = async () => {
  try {
    const response = await apiClient.get("/user/dashboard/summary");

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
