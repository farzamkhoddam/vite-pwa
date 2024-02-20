import {
  Box,
  Button,
  Input,
  Rating,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { ComponentTypes, ItemType } from "../Types";
import ClientMenu from "../ClientComponents/ClientMenu";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
interface Props {
  componentName: ComponentTypes | null;
  index?: number;
  moveItem?: (dragIndex: number, hoverIndex: number) => void;
  canEdit?: boolean;
  setDroppedItems?: React.Dispatch<
    React.SetStateAction<
      {
        name: ComponentTypes;
        componentID: string;
      }[]
    >
  >;
  componentID?: string;
  uId?: number;
}

export default function ComponentLauncher({
  componentName,
  index,
  moveItem,
  setDroppedItems,
  componentID,
  canEdit = false,
  uId,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line no-empty-pattern
  const [{}, drop] = useDrop({
    accept: ItemType.componentLauncherItem,

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item, monitor) {
      if (!canEdit) {
        return;
      }
      if (!ref.current) {
        return;
      }
      // @ts-expect-error item type is unknown and I cannot change it
      const dragIndex = item.index;
      const hoverIndex = index || 0;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset
        ? clientOffset.y - hoverBoundingRect.top
        : 0;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem && moveItem(dragIndex, hoverIndex);
      // @ts-expect-error item type is unknown and I cannot change it
      item.index = hoverIndex;
    },
  });
  // eslint-disable-next-line no-empty-pattern
  const [{}, drag] = useDrag(
    () => ({
      type: ItemType.componentLauncherItem,
      canDrag: canEdit,
      item: () => {
        return {
          index,
          name: componentName,
          componentID: componentID,
          currentParentUId: uId,
          setOriginalColumnDroppedItems: setDroppedItems,
        };
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [componentID, componentName, index, canEdit]
  );
  drag(drop(ref));
  switch (componentName) {
    case ComponentTypes.BUTTON:
      return (
        <StyledBox canEdit={canEdit} ref={ref}>
          {canEdit && <DragIcon />}
          <Button>Button</Button>
        </StyledBox>
      );
    case ComponentTypes.INPUT:
      return (
        <StyledBox canEdit={canEdit} ref={ref}>
          {canEdit && <DragIcon />}
          <Input type="solid" />
        </StyledBox>
      );
    case ComponentTypes.RATING:
      return (
        <StyledBox canEdit={canEdit} ref={ref}>
          {canEdit && <DragIcon />}
          <Typography component="legend">It sucks I know</Typography>
          <Rating name="simple-controlled" defaultValue={0.5} />
        </StyledBox>
      );
    case ComponentTypes.SWITCH:
      return (
        <StyledBox canEdit={canEdit} ref={ref}>
          {canEdit && <DragIcon />}
          <Switch />
        </StyledBox>
      );
    case ComponentTypes.MENU:
      return (
        <StyledBox canEdit={canEdit} ref={ref}>
          {canEdit && <DragIcon />}
          <ClientMenu />{" "}
        </StyledBox>
      );
    case ComponentTypes.SLIDER:
      return (
        <StyledBox canEdit={canEdit} ref={ref}>
          {canEdit && <DragIcon />}
          <Switch />
        </StyledBox>
      );
    case ComponentTypes.NEWS:
      return (
        <StyledBox canEdit={canEdit} ref={ref}>
          {canEdit && <DragIcon />}
          <Button> button</Button>
        </StyledBox>
      );
    default:
      break;
  }
}
const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "canEdit",
})<{ canEdit: boolean }>(({ canEdit }) => ({
  border: canEdit ? "1px solid" : "unset",
  cursor: canEdit ? "grab" : "unset",
  position: "relative",
}));
const DragIcon = styled(DragIndicatorIcon)(({ theme }) => ({
  background: theme.palette.primary.dark,
  borderRadius: "5px 0 0 5px",
  position: "absolute",
  top: "50%",
  left: 0,
  transform: "translate(-100%,-50%)",
  zIndex: "50000",
  width: "1rem",
}));
