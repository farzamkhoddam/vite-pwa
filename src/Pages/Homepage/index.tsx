import { useSearchParams } from "react-router-dom";
import ClientPage from "./ClientPage";
import BossPage from "./BossPage";
import { GridContextProvider } from "./Context/GridContext";

export default function Homepage() {
  const [searchParams] = useSearchParams();

  if (searchParams.get("boss") === "true") {
    return (
      <GridContextProvider>
        <BossPage />{" "}
      </GridContextProvider>
    );
  }

  return <ClientPage />;
}
