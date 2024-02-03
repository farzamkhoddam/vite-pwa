import { createContext, useEffect, useState } from "react";
import { LocalStorageTypes } from "../../../Types";
interface GridContextType {
  rowCount?: number;
  setRowCount?: React.Dispatch<React.SetStateAction<number>>;
  uIDs?: number[];
  setuIDs?: React.Dispatch<React.SetStateAction<number[]>>;
}
const GridContext = createContext<GridContextType>({});
const GridContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [uIDs, setuIDs] = useState<number[]>(
    JSON.parse(localStorage.getItem(LocalStorageTypes.UIDS) || "[1]")
  );

  
  useEffect(() => {
    localStorage.setItem(LocalStorageTypes.UIDS, `[${uIDs}]`);
  }, [uIDs]);
  return (
    <GridContext.Provider
      value={{

        uIDs,
        setuIDs,
      }}>
      {children}
    </GridContext.Provider>
  );
};
export { GridContextProvider, GridContext };
