import React, { useReducer, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightBlue } from "@mui/material/colors";
import { ITasksState } from "../interfaces/index";
import { ActionTypes } from "../consts/index";
import AppRoutes from "../routes/AppRoutes";
import taskReducer from "../reducers/TaskReducer";
import Context from "../context/tasksContext";

// Generate Custom Global theme by Material UI

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ab003c",
    },
    primary: {
      main: lightBlue[900],
    },
  },

  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Lato"', "sans-serif"].join(","),
  },
});

export default function App() {
  const [state, dispatch] = useReducer(taskReducer, []);

  useEffect(() => {
    const taskJSON = localStorage.getItem("tasks");
    const tasks: ITasksState = taskJSON !== null ? JSON.parse(taskJSON) : [];

    if (tasks) {
      dispatch({ type: ActionTypes.Fetch, tasks });
    }
  }, []);

  // every change in our state will rewrite in our local sotrage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </Context.Provider>
  );
}
