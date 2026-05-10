import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";
import { filterNullParams } from "../helpers/serviceHelpers";

const API_PREFIX = "/user/cadres";

export const getCadres = async ({
  page = 1,
  limit = 10,
  search = null,
  batch = null,
  status = null,
}) => {
  try {
    const params = filterNullParams({ page, limit, search, batch, status });
    const response = await apiClient.get(API_PREFIX, { params });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCadre = async (cadreId) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/${cadreId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createCadre = async (data) => {
  try {
    const response = await apiClient.post(API_PREFIX, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateCadre = async (cadreId, data) => {
  try {
    const response = await apiClient.put(`${API_PREFIX}/${cadreId}`, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteCadre = async (cadreId) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/${cadreId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const bulkDeleteCadres = async (payload) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/bulk-destroy`, {
      data: payload,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
