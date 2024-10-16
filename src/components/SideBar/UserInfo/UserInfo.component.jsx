import { useState } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { auth } from "../../../server/firebase";

import "./UserInfo.css";
import { ArrowDropDown } from "@mui/icons-material";

const UserInfo = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.user.currentUser);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      console.log("user signed out");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (user) {
    return (
      <Grid container direction="column" className="userinfo_grid_row">
        <Grid item>
        <Typography variant="h3" component="div" color="white" gutterBottom>
            <Box display="flex" alignItems="center">
              <img
                src="src/assets/mdi--slack.png"
                alt="Slack Icon"
                style={{ width: "30px", height: "30px", objectFit: "cover", marginRight: "10px" }}
              />
              <span style={{ fontWeight: "bold", fontSize: "1.75rem" }}>Meet Space</span>
            </Box>
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h4"
            component="div"
            className="userinfo_displayname"
          >
            <IconButton onClick={handleMenuOpen}>
              <Box display="flex" alignItems="center" color="white">
                <Avatar src={user.photoURL} />
                <Box ml={2}>{user.displayName}</Box>
                <ArrowDropDown />
              </Box>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem onClick={signOut}>Sign Out</MenuItem>
            </Menu>
          </Typography>
        </Grid>
      </Grid>
    );
  }
  return null;
};

export default UserInfo;
