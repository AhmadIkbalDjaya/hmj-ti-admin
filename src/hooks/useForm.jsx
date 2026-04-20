import { useState } from "react";

export const useForm = (initialvalues = {}) => {
  const [form, setForm] = useState(initialvalues);

  const handleChangeForm = (e) => {
    const { name, value, type, files } = e.target;
    if (type == "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type == "rich-editor") {
      setForm((prev) => ({ ...prev, [name]: value == "<p></p>" ? "" : value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => setForm(initialvalues);

  return {
    form,
    setForm,
    handleChangeForm,
    resetForm,
  };
};
