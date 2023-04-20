import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";
import { globalStyles } from "../../styles/globalStyles";
import TaskForm from "./TaskForm";
import Context from "../../context/tasksContext";
import { addTask } from "../../actions/TaskActions";
import { useNavigate } from "react-router-dom";

// custom styles of this component
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
    },

    horizontalDivider: {
      marginTop: 15,
      marginBottom: 30,
    },
  })
);

// AddTask Components helps to create new task
const AddTask: React.FC = () => {
  // define classes as a const filled bu useSyles of Material UI
  // now we can use defined classed in oue elements
  const globalClasses = globalStyles();
  const classes = useStyles();
  const navigate = useNavigate();

  // we distruct the dispatch of our context
  const { dispatch } = useContext(Context);

  return (
    <main className={globalClasses.content}>
      <div className={globalClasses.drawerHeader} />

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={6}>
          <h1 data-testid="headerH1">Add a new Task</h1>

          <Divider light className={classes.horizontalDivider} />

          {/* 
                             Task form will dispatch addTask action 
                             and then will go back to dashboard page
                          */}

          <TaskForm
            onSubmit={(task) => {
              dispatch(addTask(task));
              navigate("/");
            }}
          />
        </Grid>
      </Grid>
    </main>
  );
};

export default AddTask;
