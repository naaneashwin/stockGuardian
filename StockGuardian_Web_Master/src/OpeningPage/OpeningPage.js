import React, { Component } from "react";
import Box from "@mui/material/Box";
import TopNavBar from "../TopNavBar/TopNavBar";
import Brief from "../AppBrief/Brief";
import { Drawer } from "@mui/material";
import { DrawerContextProvider } from "../Contexts/DrawerContext";
import LoginAndRegister from "../LoginAndReg/LoginAndRegistration";

class OpeningPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nightModeEnabled: true,
      backgroundColor: "black",
      color: "white",
      mobileOpen: false,
    };
  }

  drawerWidth = 240;

  changeTheme = () => {
    if (this.state.nightModeEnabled) {
      this.setState({
        ...this.state,
        backgroundColor: "white",
        color: "black",
        nightModeEnabled: false,
      });
    } else {
      this.setState({
        ...this.state,
        backgroundColor: "black",
        color: "white",
        nightModeEnabled: true,
      });
    }
  };

  toggleDrawer = () => {
    this.setState((prevState) => {
      const newState = { ...prevState, mobileOpen: !prevState.mobileOpen };
      return newState;
    });
  };

  render() {
    return (
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        <DrawerContextProvider value={{ toggleDrawer: this.toggleDrawer }}>
          <TopNavBar />
        </DrawerContextProvider>
        <Drawer
          variant="temporary"
          open={this.state.mobileOpen}
          onClose={this.toggleDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: this.drawerWidth,
            },
          }}
        >
          {"Fill the content"}
        </Drawer>
        <Brief />
        <LoginAndRegister />
      </Box>
    );
  }
}

export default OpeningPage;
