import { createContext, useState } from "react";

const DrawerOpenContext = createContext();

const DraweOpenContextProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  return (
    <DrawerOpenContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerOpenContext.Provider>
  );
};

export const DrawerOpen = DrawerOpenContext;
export default DraweOpenContextProvider;
