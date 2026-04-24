import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";
import {
  MULTIPART_CONFIG,
  buildFormData,
  filterNullParams,
} from "../helpers/serviceHelpers";

const API_PREFIX = "/user/businesses";

const BUSINESS_FIELDS = [
  "title",
  "slug",
  "description",
  "price",
  "image",
  "whatsapp",
  "is_active",
];

export const getBusinesses = async ({
  page = 1,
  limit = 10,
  search = null,
  is_active = null,
}) => {
  try {
    const params = filterNullParams({
      page,
      limit,
      search,
      is_active,
    });
    const response = await apiClient.get(API_PREFIX, { params });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getBusiness = async (businessId) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/${businessId}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createBusiness = async (data) => {
  try {
    const response = await apiClient.post(
      API_PREFIX,
      buildFormData(data, BUSINESS_FIELDS),
      MULTIPART_CONFIG,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateBusiness = async (businessId, data) => {
  try {
    const response = await apiClient.post(
      `${API_PREFIX}/${businessId}?_method=PUT`,
      buildFormData(data, BUSINESS_FIELDS),
      MULTIPART_CONFIG,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteBusiness = async (businessId) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/${businessId}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
