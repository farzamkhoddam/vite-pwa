import Content from "./Content";
import { GridContextProvider } from "./Context/GridContext";

export default function Homepage() {

    return (
      <GridContextProvider>
        <Content />{" "}
      </GridContextProvider>
    );

}
