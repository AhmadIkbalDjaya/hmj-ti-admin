import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";
import { filterNullParams } from "../helpers/serviceHelpers";

const API_PREFIX = "/user/positions";

export const getPositions = async ({
  page = 1,
  limit = 10,
  search = null,
  is_active = null,
  level = null,
}) => {
  try {
    const params = filterNullParams({
      page,
      limit,
      search,
      is_active,
      level,
    });
    const response = await apiClient.get(API_PREFIX, { params });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPosition = async (positionId) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/${positionId}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createPosition = async (data) => {
  try {
    const response = await apiClient.post(API_PREFIX, {
      name: data.name,
      slug: data.slug,
      parent_id: data.parent_id,
      level: data.level,
      order_index: data.order_index,
      is_active: data.is_active,
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updatePosition = async (positionId, data) => {
  try {
    const response = await apiClient.put(`${API_PREFIX}/${positionId}`, {
      name: data.name,
      slug: data.slug,
      parent_id: data.parent_id,
      level: data.level,
      order_index: data.order_index,
      is_active: data.is_active,
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deletePosition = async (positionId) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/${positionId}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
