import { closeSnackbar, SnackbarProvider } from "notistack";
import { IoClose } from "react-icons/io5";

export default function AppSnackbarProvider({ children }) {
  return (
    <SnackbarProvider
      variant="info"
      maxSnack={5}
      preventDuplicate
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      action={(snackbarId) => (
        <IoClose
          onClick={() => closeSnackbar(snackbarId)}
          style={{ cursor: "pointer" }}
          size={24}
        />
      )}
    >
      {children}
    </SnackbarProvider>
  );
}
