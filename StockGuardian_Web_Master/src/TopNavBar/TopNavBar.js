import React, { Component } from "react";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { DrawerContextConsumer } from "../Contexts/DrawerContext";
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeSwitch from "./ModeSwitch/ModeSwitch";

class TopNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: "StockGuardian",
    };
  }

  render() {
    return (
      <AppBar
        position="sticky"
        sx={{
          top: 0,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DrawerContextConsumer>
            {({ toggleDrawer }) => {
              return (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  disableRipple
                  onClick={toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
              );
            }}
          </DrawerContextConsumer>
          <h3>{this.state.appName}</h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <DarkModeIcon />
            <ModeSwitch />
            <LightModeIcon />
            <IconButton size="large" edge="end" color="inherit" disableRipple>
              <LoginIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopNavBar;
