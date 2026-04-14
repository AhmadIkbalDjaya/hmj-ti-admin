import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

const API_PREFIX = "/user/articles";

export const getArticles = async ({
  page = 1,
  limit = 10,
  search = null,
  is_active = null,
  is_featured = null,
}) => {
  try {
    const params = {
      page,
      limit,
      search,
      is_active,
      is_featured,
    };
    const response = await apiClient.get(API_PREFIX, { params });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
