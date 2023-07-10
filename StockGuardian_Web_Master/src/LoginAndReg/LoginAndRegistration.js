import React, { Component } from "react";
import Login from "../Login/Login";
import { Tab, Tabs } from "@mui/material";
import TabPanel from "./TabPanel";

class LoginAndRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
    };
  }

  toggleTab = (event, value) => {
    this.setState({
      ...this.state,
      currentTab: value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Tabs
          value={this.state.currentTab}
          onChange={this.toggleTab}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value={0} label="Login" />
          <Tab value={1} label="Sign Up" />
        </Tabs>
        <TabPanel value={this.state.currentTab} index={0}>
            <Login />
        </TabPanel>
        <TabPanel value={this.state.currentTab} index={1}>
            Hello
        </TabPanel>
      </React.Fragment>
    );
  }
}

export default LoginAndRegister;
