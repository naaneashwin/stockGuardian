import React from "react";

const DrawerContext = React.createContext();

const DrawerContextProvider = DrawerContext.Provider;
const DrawerContextConsumer = DrawerContext.Consumer;

export {DrawerContextConsumer, DrawerContextProvider};