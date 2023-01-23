import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { LogOut } from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";

const settings = ["Accueil", "Logout"];
const NavBar = () => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User.user);
  const isAuth = useSelector((state) => state.User.isAuth);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Social Media Application
            </Typography>
            {isAuth ? (
              <></>
            ) : (
              <>
                {/* <Button as={Link} to="/" color="inherit">
                  Register
                </Button>
                <Button as={Link} to="/Login" color="inherit">
                  Login
                </Button> */}
              </>
            )}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      User && User.Img
                        ? User.Img.imgUrl
                        : "https://pic.onlinewebfonts.com/svg/img_155117.png"
                    }
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <button
                      className="btn"
                      onClick={() =>
                        setting === "Logout"
                          ? dispatch(LogOut())
                          : setting === ""
                          ? navigate("/Accueil")
                          : navigate("/Accueil")
                      }
                      textAlign="center"
                    >
                      {setting}
                    </button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default NavBar;
