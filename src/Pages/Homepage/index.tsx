import Box from "@mui/material/Box";
import ListDrawer from "./ListDrawer";
import { useDrop } from "react-dnd";
import { ComponentTypes, ItemType } from "../../Types";
import { useState } from "react";
import ComponentLauncher from "./ComponentLauncher";

export default function Homepage() {
  const [lastDroppedItem, setLastDroppedItem] = useState<ComponentTypes | null>(
    null
  );
  // eslint-disable-next-line no-empty-pattern
  const [{}, drop] = useDrop(() => ({
    accept: ItemType.listItem,
    drop: (item: { name: ComponentTypes }) => {
      setLastDroppedItem(item.name);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <Box sx={{ display: "flex", width: 1, height: 1 }}>
      <ListDrawer />
      <Box
        ref={drop}
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
          p: 3,
          width: 1,
          minHeight: "100vh",
          justifyContent:"center",
          alignItems:"center"
        }}>
        <ComponentLauncher componentName={lastDroppedItem } />
      </Box>
    </Box>
  );
}
// import Box from "@mui/material/Box";
// import ListDrawer from "./ListDrawer";
// import { useDrop } from "react-dnd";
// import { ComponentTypes, ItemType } from "../../Types";
// import ComponentLauncher from "./ComponentLauncher";
// import { useState } from "react";

// export default function Homepage() {
//   const [lastDroppedItem] = useState<ComponentTypes[]>([]);
//   // eslint-disable-next-line no-empty-pattern
//   const [{}, drop] = useDrop(() => ({
//     accept: ItemType.listItem,
//     drop: (item: { name: ComponentTypes }) => {
//       lastDroppedItem.push(item.name);
//     },
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//       canDrop: monitor.canDrop(),
//     }),
//   }));
//   return (
//     <Box sx={{ display: "flex", width: 1, height: 1 }}>
//       <ListDrawer />

//       <Box
//         ref={drop}
//         component="main"
//         sx={{
//           display: "flex",
//           flexGrow: 1,
//           p: 3,
//           width: 1,
//           minHeight: "100vh",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           gap:2
//         }}>
//         {lastDroppedItem.map((componentName, i) => {
//           return <ComponentLauncher componentName={componentName} key={i} />;
//         })}
//       </Box>
//     </Box>
//   );
// }
