import { useSearchParams } from "react-router-dom";
import ClientPage from "./ClientPage";
import BossPage from "./BossPage";

export default function Homepage() {
  const [searchParams] = useSearchParams();

  if (searchParams.get("boss") === "true") {
    return <BossPage />;
  }

  return <ClientPage />;
}
