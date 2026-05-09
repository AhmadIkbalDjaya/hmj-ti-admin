import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { login } from "../../../services/authService";
import { useTitle } from "../../../hooks/useTitle";
import { useSnackbar } from "notistack";

export const useLogin = () => {
  useTitle("Login");
  const navigate = useNavigate();
  const { saveAuth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");
    setLoading(true);

    try {
      const result = await login(formValues);
      saveAuth(result.data.token, result.data.user);
      enqueueSnackbar("Login berhasil", { variant: "success" });
      navigate("/", { replace: true });
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setGeneralError(error.message || "Login gagal. Silakan coba lagi.");
        enqueueSnackbar(error.message || "Login gagal. Silakan coba lagi.", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    value: {
      formValues,
      errors,
      generalError,
      loading,
    },
    func: {
      handleChangeForm,
      handleSubmit,
    },
  };
};
