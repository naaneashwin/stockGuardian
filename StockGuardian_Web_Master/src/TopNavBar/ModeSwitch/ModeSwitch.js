import { Switch } from "@mui/material";
import React, { Component } from "react";

class ModeSwitch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            darkmode: this.getThemeFromLocalStorage(),
        };
    }

    getThemeFromLocalStorage() {
        const darktheme = localStorage.getItem("darktheme");
        if (darktheme === '1') {
            this.toggleTheme('dark');
            return true;
        }
        this.toggleTheme('light');
        return false;
    }

    toggleTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    changeTheme = (event) => {
        if (event.target.checked) {
            this.toggleTheme('dark');
            localStorage.setItem("darktheme", '1');
            this.setState({
                ...this.state, darkmode: true
            });
            return;
        }
        this.toggleTheme('light');
        localStorage.setItem("darktheme", '0');
        this.setState({
            ...this.state, darkmode: false
        });
    }

  render() {
    return (
      <Switch
        checked={this.state.darkmode}
        color="default"
        onChange={this.changeTheme}
        inputProps={{ "aria-label": "lightDarkMode" }}
      />
    );
  }
}

export default ModeSwitch;
