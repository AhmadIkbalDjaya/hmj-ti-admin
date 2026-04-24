export const MULTIPART_CONFIG = {
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
};

export const buildFormData = (data, fields) => {
  const formData = new FormData();
  for (const field of fields) {
    if (data[field] != null) {
      formData.append(field, data[field]);
    }
  }

  return formData;
};

export const filterNullParams = (params) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value != null),
  );
