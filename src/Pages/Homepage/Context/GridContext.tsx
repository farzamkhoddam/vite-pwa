import { createContext, useEffect, useState } from "react";
import { ComponentTypes, LocalStorageTypes } from "../../../Types";

interface UIDType {
  uId: number;
  width?: number;
  height?: number;
  components?: {
    name: ComponentTypes;
    componentID: string;
  }[];
}
interface GridContextType {
  rowCount?: number;
  setRowCount?: React.Dispatch<React.SetStateAction<number>>;
  uIDs?: UIDType[];
  setuIDs?: React.Dispatch<
    React.SetStateAction<
      {
        uId: number;
        width?: number | undefined;
        height?: number | undefined;
        components?: {
          name: ComponentTypes;
          componentID: string;
        }[];
      }[]
    >
  >;
}
// farzam the user only can make 9 rows currently fix it
const GridContext = createContext<GridContextType>({} as GridContextType);
const GridContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [uIDs, setuIDs] = useState<UIDType[]>(
    JSON.parse(localStorage.getItem(LocalStorageTypes.UIDS) || '[{"uId":1}]')
  );
  useEffect(() => {
    localStorage.setItem(LocalStorageTypes.UIDS, JSON.stringify(uIDs));
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
