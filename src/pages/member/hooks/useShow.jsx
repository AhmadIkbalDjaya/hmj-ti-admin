import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMember } from "../../../hooks/modules/useMember";
import { useDelete } from "./useDelete";

export const useShow = () => {
  const navigate = useNavigate();
  const { id: memberId } = useParams();
  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Anggota",
      to: "/members",
    },
    {
      name: "Detail Anggota",
      to: `/members/${memberId}`,
    },
  ];

  const { member, loading, getMember } = useGetMember();

  useEffect(() => {
    getMember(memberId);
  }, []);

  const deleteProps = useDelete({
    onSuccess: () => {
      navigate("/members");
    },
  });

  return {
    value: {
      member,
      loading,
      breadcrumbItems,
      delete: deleteProps,
    },
    func: {},
  };
};
