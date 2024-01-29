import { ListItem, Menu, MenuItem, Typography } from "@mui/material";
import { Genre, SubGenre } from "../../Types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubGenreComponent from "./SubGenre";
interface Props {
  text: string;
  subGenres: Genre[];
}
const GenreComponent: React.FC<Props> = ({ text, subGenres }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <ListItem
        id={`${text}-genre`}
        onClick={(e) => handleClick(e)}
        sx={{ cursor: "pointer" }}>
        <Typography color={"primary"}>{text}</Typography>
        <ExpandMoreIcon color={"primary"} />
      </ListItem>
      <Menu
        id={`${text}-genre`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `${text}-genre`,
        }}>
        {subGenres.map((genre, i) => {
          if (genre.variant === "LINK") {
            return (
              <MenuItem
                sx={{ px: 1,width:"100%" }}
                component={"button"}
                onClick={() => navigate(genre?.href || "")}
                key={i}>
                {genre.text}
              </MenuItem>
            );
          } else {
            return (
              <SubGenreComponent
                text={genre.text}
                subGenres={genre?.subGenres || ([] as SubGenre[])}
              />
            );
          }
        })}
      </Menu>
    </>
  );
};
export default GenreComponent;
