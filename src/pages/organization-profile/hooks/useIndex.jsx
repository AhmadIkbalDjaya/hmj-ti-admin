import { useEffect } from "react";
import {
  useEditOrganizationProfile,
  useGetOrganizationProfile,
} from "../../../hooks/modules/useOrganizationProfile";
import { useForm } from "../../../hooks/useForm";
import { useTitle } from "../../../hooks/useTitle";

const emptyForm = {
  goal: "",
  vision: "",
  missions: [""],
  main_image: null,
  secondary_image: null,
  current_main_image: null,
  current_secondary_image: null,
};

export const useIndex = () => {
  useTitle("Profil Organisasi");

  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Profil Organisasi",
      to: "/organization-profile",
    },
  ];

  const { form, setForm, handleChangeForm } = useForm(emptyForm);
  const { loading, getOrganizationProfile } = useGetOrganizationProfile();

  const setProfileForm = (profile) => {
    setForm({
      goal: profile?.goal ?? "",
      vision: profile?.vision ?? "",
      missions: profile?.missions?.length ? profile.missions : [""],
      main_image: null,
      secondary_image: null,
      current_main_image: profile?.main_image ?? null,
      current_secondary_image: profile?.secondary_image ?? null,
    });
  };

  const fetchProfile = async () => {
    const result = await getOrganizationProfile();

    if (result) {
      setProfileForm(result);
    }
  };

  useEffect(() => {
    fetchProfile();
    // The surrounding admin hooks use one-time initial fetches for edit pages.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    loading: loadingSubmit,
    errors,
    editOrganizationProfile,
  } = useEditOrganizationProfile({
    onSuccess: setProfileForm,
  });

  const handleMissionChange = (index, value) => {
    setForm((prev) => ({
      ...prev,
      missions: prev.missions.map((mission, missionIndex) =>
        missionIndex === index ? value : mission,
      ),
    }));
  };

  const handleAddMission = () => {
    setForm((prev) => ({
      ...prev,
      missions: [...prev.missions, ""],
    }));
  };

  const handleRemoveMission = (index) => {
    setForm((prev) => ({
      ...prev,
      missions:
        prev.missions.length > 1
          ? prev.missions.filter((_, missionIndex) => missionIndex !== index)
          : [""],
    }));
  };

  const handleSubmit = () => {
    editOrganizationProfile(form);
  };

  return {
    value: {
      breadcrumbItems,
      form,
      loading,
      loadingSubmit,
      errors,
    },
    func: {
      handleChangeForm,
      handleMissionChange,
      handleAddMission,
      handleRemoveMission,
      handleSubmit,
    },
  };
};
