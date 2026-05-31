import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPosition } from "../../../hooks/modules/usePosition";
import { useDelete } from "./useDelete";
import { useTitle } from "../../../hooks/useTitle";

export const useShow = () => {
  useTitle("Detail Jabatan");
  const navigate = useNavigate();
  const { id: positionId } = useParams();
  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Jabatan",
      to: "/positions",
    },
    {
      name: "Detail Jabatan",
      to: `/positions/${positionId}`,
    },
  ];

  const { position, loading, getPosition } = useGetPosition();

  useEffect(() => {
    if (!positionId) return;

    getPosition(positionId);
  }, [positionId]);

  const deleteProps = useDelete({
    onSuccess: () => {
      navigate("/positions");
    },
  });

  return {
    value: {
      position,
      loading,
      breadcrumbItems,
      delete: deleteProps,
    },
    func: {},
  };
};
