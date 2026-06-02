import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPosition,
  useGetPositions,
} from "../../../hooks/modules/usePosition";
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
  const {
    positions: childPositions,
    loading: childPositionsLoading,
    fetchPositions: fetchChildPositions,
  } = useGetPositions();

  useEffect(() => {
    if (!positionId) return;

    getPosition(positionId);
  }, [positionId]);

  useEffect(() => {
    if (!position?.id || ![1, 2].includes(Number(position.level))) return;

    fetchChildPositions({
      page: 1,
      limit: 1000,
      parent_id: position.id,
      level: Number(position.level) === 1 ? 2 : null,
    });
  }, [position?.id, position?.level]);

  const deleteProps = useDelete({
    onSuccess: () => {
      navigate("/positions");
    },
  });

  return {
    value: {
      position,
      loading,
      childPositions,
      childPositionsLoading,
      breadcrumbItems,
      delete: deleteProps,
    },
    func: {},
  };
};
