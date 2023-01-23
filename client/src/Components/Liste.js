import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ArticleIcon from "@mui/icons-material/Article";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
export default function NestedList() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const User = useSelector((state) => state.User.user);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List className="listm">
      <ListItemButton onClick={() => navigate("/Profile")}>
        <ListItemIcon>
          <PermIdentityIcon></PermIdentityIcon>
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItemButton>
      {/* ....................................................... */}
      <ListItemButton onClick={() => navigate("/Accueil")}>
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary="Accueil" />
      </ListItemButton>
      {/* ....................................................... */}
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {/* ....................................................... */}
        { User && User.Role == "admin" &&<List component="div" disablePadding>
          <ListItemButton onClick={() => navigate("/UserListe")} sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="UserListe" />
          </ListItemButton>
        </List>}
        {/* ....................................................... */}
        <List component="div" disablePadding>
          <ListItemButton onClick={() => navigate("/Apropos")} sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="About us" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
