import { createContext, useEffect, useState } from "react";
import {
  ComponentDataTypes,
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
    componentData?: ComponentDataTypes;
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
          componentData?: ComponentDataTypes;
        }[];
      }[]
    >
  >;
}
interface ServerLayoutType {
  uId: number;
  width?: number;
  height?: number;
  components?: {
    name: ComponentTypes;
    componentID: string;
    componentDatas?: string;
  }[];
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
  const { data, isError, isFetching } = useQuery<ServerLayoutType[]>(
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
  const fromattedData = data?.map((item) => {
    return {
      uId: item.uId,
      width: item.width,
      height: item.height,
      components: item.components?.map((component) => {
        return {
          name: component.name,
          componentID: component.componentID,
          componentData: JSON.parse(component.componentDatas || "[]"),
        };
      }),
    };
  });
  const [uIDs, setuIDs] = useState<UIDType[]>(
    fromattedData || ([] as UIDType[])
  );
  useEffect(() => {
    if (fromattedData) {
      setuIDs(fromattedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    if (uIDs?.length === 0) {
      setuIDs([{ uId: 1 }]);
    }
    console.log("farzam uid ===", uIDs);
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
