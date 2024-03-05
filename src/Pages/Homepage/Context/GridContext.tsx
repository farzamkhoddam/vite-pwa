import { createContext, useEffect, useState } from "react";
import {
  ClientSlider_Cards,
  ComponentTypes,
  CookiesTypes,
} from "../../../Types";
import axios from "axios";
import { useQuery } from "react-query";

import Cookies from "js-cookie";

export interface UIDType {
  uId: number;
  width?: number;
  height?: number;
  components?: {
    name: ComponentTypes;
    componentID: string;
    componentData?: ClientSlider_Cards[];
  }[];
}
interface GridContextType {
  isFetching: boolean;
  isError: boolean;
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
          componentData?: ClientSlider_Cards[];
        }[];
      }[]
    >
  >;
}
// farzam the user only can make 9 rows currently fix it
const GridContext = createContext<GridContextType>({} as GridContextType);
const GridContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    // Change the state to true after the component mounts
    setShouldFetch(false);
  }, []);
  const headers = Cookies.get(CookiesTypes.USER_KEY)
    ? {
        headers: {
          Authorization: `Bearer ${Cookies.get(CookiesTypes.USER_KEY)}`,
        },
      }
    : {};
  const { data, isError, isFetching } = useQuery(
    "getLayoutData",
    async () => {
      const response = await axios.get(
        `https://localhost:7215/api/layout`,
        headers
      );
      return response.data;
    },
    { enabled: shouldFetch }
  );
  const [uIDs, setuIDs] = useState<UIDType[]>(data);
  useEffect(() => {
    setuIDs(data);
  }, [data]);
  useEffect(() => {
    if (uIDs?.length === 0) {
      setuIDs([{ uId: 1 }]);
    }
  }, [uIDs]);
  return (
    <GridContext.Provider
      value={{
        uIDs,
        setuIDs,
        isFetching,
        isError,
      }}>
      {children}
    </GridContext.Provider>
  );
};
export { GridContextProvider, GridContext };
