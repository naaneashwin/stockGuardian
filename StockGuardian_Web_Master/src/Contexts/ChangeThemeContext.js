import React from "react";

const ChangeThemeContext = React.createContext();

const ChangeThemeProvider = ChangeThemeContext.Provider;
const ChangeThemeConsumer = ChangeThemeContext.Consumer;

export {ChangeThemeConsumer, ChangeThemeProvider};