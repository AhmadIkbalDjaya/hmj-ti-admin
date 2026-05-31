import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";
import { filterNullParams } from "../helpers/serviceHelpers";

const API_PREFIX = "/user/search";

export const getGlobalSearchResults = async ({
  search = null,
  limit = 5,
  signal,
}) => {
  try {
    const params = filterNullParams({ search, limit });
    const response = await apiClient.get(API_PREFIX, { params, signal });

    return response.data;
  } catch (error) {
    if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
      throw error;
    }

    return handleApiError(error);
  }
};
