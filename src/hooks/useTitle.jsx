import { useEffect } from "react";

export const useTitle = (title) => {
  const app_name = import.meta.env.VITE_APP_NAME || "HMJ-TI UINAM";

  useEffect(() => {
    const clean_title = title?.trim();

    const full_title = clean_title ? `${clean_title} | ${app_name}` : app_name;

    document.title = full_title;

    return () => (document.title = app_name);
  }, [title, app_name]);
};
