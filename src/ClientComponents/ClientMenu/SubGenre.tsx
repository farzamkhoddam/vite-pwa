import { Box,  Menu, MenuItem, Typography } from "@mui/material";
import { SubGenre } from "../../Types";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  text: string;
  subGenres: SubGenre[];
}
const SubGenreComponent: React.FC<Props> = ({ text, subGenres }) => {
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
    <Box sx={{position:"relative"}}>
      <MenuItem
        id={`${text}-subgenre`}
        onClick={(e) => handleClick(e)}
        sx={{ cursor: "pointer",gap:2,px:1 }}>
        <Typography >{text}</Typography>
        <KeyboardArrowRightIcon />
      </MenuItem>
      <Menu
      anchorOrigin={{horizontal:"left",vertical:"bottom"}}
        id={`${text}-subgenre`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        {subGenres.map((subGenre, i) => {
          return (
            <MenuItem
              sx={{ px: 2, width: 1, justifyContent: "center" }}
              component={"button"}
              onClick={() => navigate(subGenre.href)}
              key={i}>
              {subGenre.text}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};
export default SubGenreComponent;
