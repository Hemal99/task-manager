import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  let navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ backgroundColor: "#0276aa" }}>
        <Toolbar>
          {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Box
              component="div"
              sx={{
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginTop: "8px",
              }}
            >
              Task Management
            </Box>
          </Typography>
          {/* <Button color="inherit" onClick={onLogout}>
              Logout
            </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
