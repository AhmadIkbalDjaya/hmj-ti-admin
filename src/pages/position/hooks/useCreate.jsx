import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useCreatePosition,
  useGetPosition,
} from "../../../hooks/modules/usePosition";
import { useForm } from "../../../hooks/useForm";
import { useTitle } from "../../../hooks/useTitle";
import { generateSlug } from "../../../helpers/stringHelpers";
import {
  getPositionLevelLabel,
  POSITION_LEVEL_OPTIONS,
} from "../components/PositionForm";

const ROOT_LEVEL_OPTIONS = POSITION_LEVEL_OPTIONS.filter((level) =>
  [0, 1].includes(level.value),
);

export const useCreate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParentId = searchParams.get("parent_id") ?? "";
  const queryLevel = searchParams.get("level");
  const childLevel = queryLevel === null ? "" : Number(queryLevel);
  const isChildCreate = Boolean(queryParentId && queryLevel !== null);
  const pageTitle = isChildCreate
    ? `Tambah ${getPositionLevelLabel(childLevel)}`
    : "Tambah Jabatan";

  useTitle(pageTitle);

  const {
    position: parentPosition,
    loading: parentLoading,
    getPosition: getParentPosition,
  } = useGetPosition();

  useEffect(() => {
    if (queryParentId) {
      getParentPosition(queryParentId);
    }
  }, [queryParentId]);

  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Jabatan",
      to: "/positions",
    },
    ...(isChildCreate
      ? [
          {
            name: parentPosition?.name ?? "Detail Jabatan",
            to: `/positions/${queryParentId}`,
          },
        ]
      : []),
    {
      name: pageTitle,
      to: `/positions/create${isChildCreate ? `?parent_id=${queryParentId}&level=${childLevel}` : ""}`,
    },
  ];

  const formInitial = {
    name: "",
    slug: "",
    parent_id: queryParentId,
    level: isChildCreate ? childLevel : "",
    order_index: 0,
    is_active: 1,
  };

  const { form, handleChangeForm, setForm } = useForm(formInitial);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      parent_id: queryParentId,
      level: isChildCreate ? childLevel : "",
    }));
  }, [queryParentId, childLevel, isChildCreate]);

  const handleChangeFormWithSlug = (e) => {
    const { name, value } = e.target;
    handleChangeForm(e);
    if (name === "name" && !slugManuallyEdited) {
      setForm((prev) => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  const handleSlugChange = (e) => {
    const { value } = e.target;
    setSlugManuallyEdited(true);
    setForm((prev) => ({ ...prev, slug: value }));
  };

  const { loading, errors, createPosition } = useCreatePosition({
    onSuccess: () => {
      navigate(isChildCreate ? `/positions/${queryParentId}` : "/positions");
    },
  });
  const handleSubmit = () => {
    createPosition({
      ...form,
      parent_id: isChildCreate ? queryParentId : null,
      level: isChildCreate ? childLevel : form.level,
    });
  };

  return {
    value: {
      breadcrumbItems,
      pageTitle,
      form,
      errors,
      loading,
      parentLoading: isChildCreate ? parentLoading : false,
      parentLabel: parentPosition?.name ?? "",
      allowedLevels: isChildCreate
        ? [{ value: childLevel, label: getPositionLevelLabel(childLevel) }]
        : ROOT_LEVEL_OPTIONS,
      isChildCreate,
    },
    func: {
      handleChangeForm: handleChangeFormWithSlug,
      handleSlugChange,
      handleSubmit,
    },
  };
};
