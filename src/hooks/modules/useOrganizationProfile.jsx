import { useState } from "react";
import { useSnackbar } from "notistack";
import {
  getOrganizationProfile as getOrganizationProfileService,
  updateOrganizationProfile as updateOrganizationProfileService,
} from "../../services/organizationProfileService";

export const useGetOrganizationProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();

  const getOrganizationProfile = async () => {
    try {
      setLoading(true);
      const result = await getOrganizationProfileService();
      setProfile(result.data);
      setLoading(false);

      return result.data;
    } catch (error) {
      const message = error?.message ?? "Gagal mengambil profil organisasi";
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return {
    loading,
    profile,
    getOrganizationProfile,
  };
};

export const useEditOrganizationProfile = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const editOrganizationProfile = async (form) => {
    try {
      setLoading(true);
      setErrors([]);

      const result = await updateOrganizationProfileService({
        goal: form.goal,
        vision: form.vision,
        missions: form.missions,
        main_image: form.main_image,
        secondary_image: form.secondary_image,
      });

      onSuccess?.(result.data);

      const message = result.message ?? "Profil organisasi berhasil diedit";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        const message = error?.message ?? "Gagal mengedit profil organisasi";
        enqueueSnackbar(message, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, editOrganizationProfile };
};
