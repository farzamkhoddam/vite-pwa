import { createContext, useEffect, useState } from "react";
import { LocalStorageTypes } from "../../../Types";
interface GridContextType {
  rowCount?: number;
  setRowCount?: React.Dispatch<React.SetStateAction<number>>;
  invisibleParts?: number[];
  setInvisibleParts?: React.Dispatch<React.SetStateAction<number[]>>;
  allColumns?: number[];
  setAllColumns?: React.Dispatch<React.SetStateAction<number[]>>;
}
const GridContext = createContext<GridContextType>({});
const GridContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [rowCount, setRowCount] = useState<number>(
    JSON.parse(localStorage.getItem(LocalStorageTypes.ROW_NUMBER) || "0")
  );
  const [invisibleParts, setInvisibleParts] = useState<number[]>(
    JSON.parse(localStorage.getItem(LocalStorageTypes.INVISIBLE_PARTS) || "[]")
  );
  const [allColumns, setAllColumns] = useState<number[]>(
    JSON.parse(localStorage.getItem(LocalStorageTypes.ALL_COLUMNS) || "[]")
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
    localStorage.setItem(LocalStorageTypes.ALL_COLUMNS, `[${allColumns}]`);
  }, [allColumns]);
  return (
    <GridContext.Provider
      value={{
        rowCount,
        setRowCount,
        invisibleParts,
        setInvisibleParts,
        allColumns,
        setAllColumns,
      }}>
      {children}
    </GridContext.Provider>
  );
};
export { GridContextProvider, GridContext };
