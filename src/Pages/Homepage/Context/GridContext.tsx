import { createContext, useEffect, useState } from "react";
import { LocalStorageTypes } from "../../../Types";
interface GridContextType {
  rowCount?: number;
  setRowCount?: React.Dispatch<React.SetStateAction<number>>;
  invisibleParts?: number[];
  setInvisibleParts?: React.Dispatch<React.SetStateAction<number[]>>;
  uIDs?: number[];
  setuIDs?: React.Dispatch<React.SetStateAction<number[]>>;
}
const GridContext = createContext<GridContextType>({});
const GridContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [rowCount, setRowCount] = useState<number>(
    JSON.parse(localStorage.getItem(LocalStorageTypes.ROW_NUMBER) || "0")
  );
  const [invisibleParts, setInvisibleParts] = useState<number[]>(
    JSON.parse(localStorage.getItem(LocalStorageTypes.INVISIBLE_PARTS) || "[]")
  );
  const [uIDs, setuIDs] = useState<number[]>(
    JSON.parse(localStorage.getItem(LocalStorageTypes.UIDS) || "[]")
  );
  useEffect(() => {
    localStorage.setItem(LocalStorageTypes.ROW_NUMBER, rowCount.toString());
  }, [rowCount]);
  useEffect(() => {
    localStorage.setItem(
      LocalStorageTypes.INVISIBLE_PARTS,
      `[${invisibleParts}]`
    );
  }, [invisibleParts]);
  useEffect(() => {
    localStorage.setItem(LocalStorageTypes.UIDS, `[${uIDs}]`);
  }, [uIDs]);
  return (
    <GridContext.Provider
      value={{
        rowCount,
        setRowCount,
        invisibleParts,
        setInvisibleParts,
        uIDs,
        setuIDs,
      }}>
      {children}
    </GridContext.Provider>
  );
};
export { GridContextProvider, GridContext };
