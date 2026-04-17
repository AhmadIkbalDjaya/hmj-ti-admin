import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

const API_PREFIX = "/user/articles";

const ARTICLE_FIELDS = [
  "title",
  "slug",
  "publish_at",
  "content",
  "is_active",
  "is_featured",
  "image",
];

const MULTIPART_CONFIG = {
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
};

const buildFormData = (data, fields) => {
  const formData = new FormData();
  for (const field of fields) {
    if (data[field] != null) {
      formData.append(field, data[field]);
    }
  }

  return formData;
};

const filterNullParams = (params) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value != null),
  );

export const getArticles = async ({
  page = 1,
  limit = 10,
  search = null,
  is_active = null,
  is_featured = null,
}) => {
  try {
    const params = filterNullParams({
      page,
      limit,
      search,
      is_active,
      is_featured,
    });
    const response = await apiClient.get(API_PREFIX, { params });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getArticle = async (articleId) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/${articleId}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createArticle = async (data) => {
  try {
    const response = await apiClient.post(
      API_PREFIX,
      buildFormData(data, ARTICLE_FIELDS),
      MULTIPART_CONFIG,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateArticle = async (articleId, data) => {
  try {
    const response = await apiClient.put(
      `${API_PREFIX}/${articleId}`,
      buildFormData(data, ARTICLE_FIELDS),
      MULTIPART_CONFIG,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteArticle = async (articleId) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/${articleId}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
