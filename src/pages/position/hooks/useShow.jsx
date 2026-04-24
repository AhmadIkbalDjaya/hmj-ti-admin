import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPosition } from "../../../hooks/modules/usePosition";
import { useDelete } from "./useDelete";

export const useShow = () => {
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
    getPosition(positionId);
  }, []);

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
