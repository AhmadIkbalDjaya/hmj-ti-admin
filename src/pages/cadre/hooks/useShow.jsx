import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCadre } from "../../../hooks/modules/useCadre";
import { useDelete } from "./useDelete";
import { useTitle } from "../../../hooks/useTitle";

export const useShow = () => {
  useTitle("Detail Kader");
  const navigate = useNavigate();
  const { id: cadreId } = useParams();
  const breadcrumbItems = [
    { name: "Dashboard", to: "/" },
    { name: "Kader", to: "/cadres" },
    { name: "Detail Kader", to: `/cadres/${cadreId}` },
  ];

  const { cadre, loading, getCadre } = useGetCadre();

  useEffect(() => {
    getCadre(cadreId);
  }, []);

  const deleteProps = useDelete({
    onSuccess: () => {
      navigate("/cadres");
    },
  });

  return {
    value: {
      cadre,
      loading,
      breadcrumbItems,
      delete: deleteProps,
    },
    func: {},
  };
};
