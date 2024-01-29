import { Button, Input, Rating, Switch, Typography } from "@mui/material";
import { ComponentTypes } from "../../../Types";

export default function ComponentLauncher({
  componentName,
}: {
  componentName: ComponentTypes | null;
}) {
  switch (componentName) {
    case ComponentTypes.BUTTON:
      return <Button>Button</Button>;
    case ComponentTypes.INPUT:
      return <Input type="solid" />;
    case ComponentTypes.RATING:
      return (
        <>
          {" "}
          <Typography component="legend">It sucks I know</Typography>
          <Rating name="simple-controlled" defaultValue={0.5} />
        </>
      );
    case ComponentTypes.SWITCH:
      return <Switch />;
    default:
      break;
  }
}
