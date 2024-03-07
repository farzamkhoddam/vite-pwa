// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { useContext, useEffect, useState } from "react";
import { ClientSlider_Cards, ComponentDataTypes } from "@/Types";
import CardComponent from "./Card";
import { Box, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditOrAddDialog from "./Dialog/EditOrAddDialog";
import { GridContext } from "@/Pages/Homepage/Context/GridContext";
import { IsClientBoss } from "@/utils";
interface Props {
  componentId: string;
  uId: number;
  componentData?: ComponentDataTypes;
}
const Slider: React.FC<Props> = ({ componentId, uId, componentData }) => {
  const { uIDs, setuIDs } = useContext(GridContext);

  const [cards, setCards] = useState<ClientSlider_Cards[]>(
    componentData as ClientSlider_Cards[] || ([] as ClientSlider_Cards[])
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleAddButtonClicked = () => {
    setOpenDialog((prevState) => !prevState);
  };
  const isClientBoss = IsClientBoss();
  const handleAddCard = ({
    titleValue,
    descValue,
    imageValue,
  }: {
    titleValue: string;
    descValue: string;
    imageValue: string;
  }) => {
    // Handle save logic here
    setCards((prevState) => {
      return [
        ...prevState,
        { title: titleValue, desc: descValue, image: imageValue },
      ];
    });
  };
  useEffect(() => {
    if (uIDs && setuIDs && cards) {
      setuIDs((prevState) => {
        const updatedUIDs = prevState.map((item) => {
          if (item.uId === uId) {
            // Update componentData if the component matches componentId
            return {
              ...item, // Spread existing item properties
              components: item.components?.map((component) =>
                component.componentID === componentId
                  ? {
                      componentData: cards, // Assuming cards is a valid array
                      componentID: component.componentID,
                      name: component.name,
                    }
                  : component
              ),
            };
          } else {
            // No change, explicitly return the original item
            return item;
          }
        });

        // Update state with the modified array (assuming setUIDs handles it)
        return [...updatedUIDs];
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);
  return (
    <>
      {" "}
      <EditOrAddDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onSaveClicked={handleAddCard}
      />
      <StyledSwiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper">
        {cards.map((card, i) => {
          return (
            <StyledSwiperSlide>
              <CardComponent setCards={setCards} card={card} index={i} />
            </StyledSwiperSlide>
          );
        })}
        {isClientBoss && (
          <StyledSwiperSlide>
            <Box
              onClick={handleAddButtonClicked}
              sx={{
                width: "100%",
                height: 140,
                maxWidth: 345,

                backdropFilter: "blur(10px)",
                borderRadius: "10px",
                overflow: "hidden",
                border: "2px dashed ",
                borderColor: grey[700],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}>
              <AddCircleOutlineOutlinedIcon
                sx={{ width: "2rem", height: "auto" }}
              />
            </Box>
          </StyledSwiperSlide>
        )}
      </StyledSwiper>
    </>
  );
};
export default Slider;
const StyledSwiper = styled(Swiper)({
  width: "100%",
  maxWidth: "30rem",
  minWidth: "15rem",
  padding: "0.5rem",
  "& .swiper-button-next:after": {
    color: grey[600], // Example styling
    fontSize: "25px",
    fontWeight: "bold",
  },
  "& .swiper-button-prev:after": {
    color: grey[600], // Example styling
    fontSize: "25px",
  },
});

const StyledSwiperSlide = styled(SwiperSlide)({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});
