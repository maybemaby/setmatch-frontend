import React from "react";
import { usePaginate } from "../../hooks/usePaginate";

const PageContext = React.createContext<ReturnType<typeof usePaginate> | null>(
  null
);

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const paginate = usePaginate(1);

  return (
    <PageContext.Provider value={paginate}>{children}</PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = React.useContext(PageContext);
  return context;
};
