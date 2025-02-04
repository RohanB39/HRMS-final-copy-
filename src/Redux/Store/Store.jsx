import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Features/CounterSlice";
import sidebarReducer from "../Features/SidebarSlice";
import headerMenuReducer from "../Features/HeaderMenuSlice";
import themeReducer from "../Features/ThemeSlice";
import hrReducer from "../Features/hrSlice";
import employeesReducer from "../Features/EmployeeSlice";

const store = configureStore({
  reducer: {
    // theme
    theme: themeReducer,

    //counter
    counter: counterReducer,

    // sidebar
    sidebar: sidebarReducer,

    // header menu
    headermenu: headerMenuReducer,

    // Hr Store
    hr: hrReducer,

    // Employee Store
    employees: employeesReducer ,
  },
});

export default store;
