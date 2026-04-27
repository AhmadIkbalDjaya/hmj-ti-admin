import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBusiness } from "../../../hooks/modules/useBusiness";
import { useDelete } from "./useDelete";
import { useTitle } from "../../../hooks/useTitle";

export const useShow = () => {
  useTitle("Detail Usaha");
  const navigate = useNavigate();
  const { id: businessId } = useParams();
  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Usaha",
      to: "/businesses",
    },
    {
      name: "Detail Usaha",
      to: `/businesses/${businessId}`,
    },
  ];

  const { business, loading, getBusiness } = useGetBusiness();

  useEffect(() => {
    getBusiness(businessId);
  }, []);

  const deleteProps = useDelete({
    onSuccess: () => {
      navigate("/businesses");
    },
  });

  return {
    value: {
      business,
      loading,
      breadcrumbItems,
      delete: deleteProps,
    },
    func: {},
  };
};
