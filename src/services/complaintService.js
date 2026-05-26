import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";
import { filterNullParams } from "../helpers/serviceHelpers";

const API_PREFIX = "/user/complaints";

export const getComplaints = async ({
  page = 1,
  limit = 10,
  search = null,
  is_read = null,
}) => {
  try {
    const params = filterNullParams({
      page,
      limit,
      search,
      is_read,
    });
    const response = await apiClient.get(API_PREFIX, { params });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getComplaint = async (complaintId) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/${complaintId}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteComplaint = async (complaintId) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/${complaintId}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const bulkDeleteComplaints = async (payload) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/bulk-destroy`, {
      data: payload,
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const toggleReadComplaint = async (compaintId, { is_read }) => {
  try {
    const response = await apiClient.patch(
      `${API_PREFIX}/${compaintId}/toggle-read`,
      {
        is_read,
      },
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
