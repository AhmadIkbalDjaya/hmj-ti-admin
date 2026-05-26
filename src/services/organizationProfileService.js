import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";
import { MULTIPART_CONFIG } from "../helpers/serviceHelpers";

const API_PREFIX = "/user/organization-profile";

const buildOrganizationProfileFormData = (data) => {
  const formData = new FormData();

  formData.append("goal", data.goal ?? "");
  formData.append("vision", data.vision ?? "");

  (data.missions ?? []).forEach((mission) => {
    formData.append("missions[]", mission ?? "");
  });

  if (data.main_image) {
    formData.append("main_image", data.main_image);
  }

  if (data.secondary_image) {
    formData.append("secondary_image", data.secondary_image);
  }

  return formData;
};

export const getOrganizationProfile = async () => {
  try {
    const response = await apiClient.get(API_PREFIX);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateOrganizationProfile = async (data) => {
  try {
    const response = await apiClient.post(
      `${API_PREFIX}?_method=PUT`,
      buildOrganizationProfileFormData(data),
      MULTIPART_CONFIG,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
