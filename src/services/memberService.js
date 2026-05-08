import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";
import {
  MULTIPART_CONFIG,
  buildFormData,
  filterNullParams,
} from "../helpers/serviceHelpers";

const API_PREFIX = "/user/members";

const MEMBER_FIELDS = ["name", "photo", "position_id"];

export const getMembers = async ({
  page = 1,
  limit = 10,
  search = null,
  position_id = null,
}) => {
  try {
    const params = filterNullParams({
      page,
      limit,
      search,
      position_id,
    });
    const response = await apiClient.get(API_PREFIX, { params });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getMember = async (memberId) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/${memberId}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createMember = async (data) => {
  try {
    const response = await apiClient.post(
      API_PREFIX,
      buildFormData(data, MEMBER_FIELDS),
      MULTIPART_CONFIG,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateMember = async (memberId, data) => {
  try {
    const response = await apiClient.post(
      `${API_PREFIX}/${memberId}?_method=PUT`,
      buildFormData(data, MEMBER_FIELDS),
      MULTIPART_CONFIG,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteMember = async (memberId) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/${memberId}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const bulkDeleteMembers = async (payload) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/bulk-destroy`, {
      data: payload,
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
