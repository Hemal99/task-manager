import React, { FormEvent, useContext, useState } from "react";
import { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import SnoozeIcon from "@mui/icons-material/Snooze";

import { FilterTask } from "../../interfaces/index";
import Context from "../../context/tasksContext";
import TaskItem from "./TaskItem";
import { TaskHistory } from "../../consts/index";
import filterTasks from "../../selectors/filterTasks";
import { Colors } from "../../consts";

// custom styles of this component
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    select: {
      border: 0,
      fontSize: 16,
      color: "#656565",
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    horizontalDivider: {
      marginTop: 15,
      marginBottom: 30,
    },

    itemSection: {
      marginTop: 15,
      backgroundColor: Colors.lightBlue,
      borderRadius: 10,
      padding: 10,
    },

    taskTitle: {
      color: "white",
      backgroundColor: Colors.blue,
      padding: 5,
      borderRadius: 10,
      marginBottom: 10,
    },
  })
);

// TaskList Component show all tasks in Home page
const TasksList: React.FC = () => {
  // define classes as a const filled bu useSyles of Material UI
  // now we can use defined classed in oue elements
  const classes = useStyles();

  // we retrieved the state from our Context
  const { state } = useContext(Context);

  console.log("state", state);

  // in dashboard page we have 2 filter (filter by text) and (filter by status)
  // we need 2 states to handle this filter
  // then in order to use filterTasks(state, filter: IFilterTask) we define a filer
  // const and assign an object to it.
  let [textFilter, setTextFilter] = useState("");
  let [statusFilter, setStatusFilter] = useState("All");
  const filter: FilterTask = { text: textFilter, status: statusFilter };

  // handle Filter Textbox for text
  const handleTextFilter = (e: FormEvent) => {
    setTextFilter((textFilter = (e.target as HTMLInputElement).value));
  };

  // handle Filter Droptdown for status
  const handleSelectFilter = (e: FormEvent) => {
    setStatusFilter((statusFilter = (e.target as HTMLSelectElement).value));
  };

  // this handler fill the initial values of our status selectElement
  const handleViewOfFilterDropDown = (): string[] => {
    const setOfStatusTexts: string[] = Object.values(TaskHistory).filter(
      (value) => typeof value === "string"
    );
    return setOfStatusTexts;
  };

  // when state has value means that we have some taks in our local storage.
  // so we can show it on the our list
  // first we render our filer menu
  // then we show our tasks.
  return (
    <>
      <div className={classes.taskTitle}>
        <Typography variant="h6" component="p" align="left">
          Tasks
        </Typography>
      </div>
      {state.length === 0 ? (
        <div>
          <Typography variant="h6" component="p" align="center">
            <SnoozeIcon style={{ fontSize: 100 }} /> <br />
            You Have Nothing to Do <br />
            Go and Get Some Sleep <br />
            <br />
          </Typography>
        </div>
      ) : (
        <>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="center"
            style={{ marginBottom: 25 }}
          >
            <Grid item xs={12} sm={12} md={6}>
              <Paper component="form" className={classes.root}>
                <InputBase
                  onChange={handleTextFilter}
                  className={classes.input}
                  placeholder="Type to Filter Tasks"
                />
                <Divider className={classes.divider} orientation="vertical" />
                <select
                  onChange={handleSelectFilter}
                  className={classes.select}
                >
                  {/* 
                                Pay attention to this extra option
                                This option is required to show all task in first render and 
                                clean the status Filter
                            */}
                  <option>All</option>
                  {handleViewOfFilterDropDown().map((status: string, index) => (
                    <option key={index}>{status}</option>
                  ))}
                </select>
              </Paper>
            </Grid>
          </Grid>
          <Divider light className={classes.horizontalDivider} />
          <Grid container spacing={3}>
            {filterTasks(state, filter).map((task, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={3}>
                  <TaskItem {...task} />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
};

export default TasksList;
