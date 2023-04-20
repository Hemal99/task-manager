import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import { globalStyles } from "../../styles/globalStyles";
import TaskForm from "./TaskForm";
import Context from "../../context/tasksContext";
import { editTask, removeTask } from "../../actions/TaskActions";

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
    floatRight: {
      float: "right",
    },
  })
);

// in this component we use id param to edit a taask
// TS doesn't know any thing about this tyype
// we should define an interface to define our id type
// type for `match.params`
// must be type `string` since value comes from the URL
// then it will pass to RouteComponentProps Component
interface RouterProps {
  id: string;
}

// this Componet helps to Edit a task based in ID of task
const EditTask: React.FC = () => {
  // define classes as a const filled bu useSyles of Material UI
  // now we can use defined classed in oue elements
  const globalClasses = globalStyles();
  const classes = useStyles();

  // route params
  const { id } = useParams<Record<string, string>>();

  // navigation
  const navigate = useNavigate();

  // here we destruct our state and dispatch from Contex
  const { state, dispatch } = useContext(Context);

  // based on ID we will find our desired task to Edit
  // and then will fill the form elements with its content
  const selectedTask = state.find((task) => task.id === id);

  // this state and handlers will use to handle the state of dialog to confirm deleting
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <main className={globalClasses.content}>
      <div className={globalClasses.drawerHeader} />

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={6}>
          <h1>
            {" "}
            Edit Task
            {/* 
                        This Button handle remove a task based on ID
                        first show a dialog to confirm
                    */}
            <Button
              className={classes.floatRight}
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
            >
              Remove Task
            </Button>
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Are You Sure to Delete the Task
              </DialogTitle>
              <DialogContent dividers>
                <DialogContentText
                  id="alert-dialog-description"
                  style={{ justifyContent: "center" }}
                >
                  <ReportProblemIcon
                    color="secondary"
                    style={{ fontSize: 40, textAlign: "center" }}
                  />
                  <br />
                  This action can delete your task and you can not restore it.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={handleCloseDialog}
                  color="primary"
                  autoFocus
                >
                  No I'm Not
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(removeTask(id));
                    navigate("/");
                  }}
                  color="secondary"
                >
                  Yes I'm Sure
                </Button>
              </DialogActions>
            </Dialog>
          </h1>

          <Divider light className={classes.horizontalDivider} />

          {/* 
                        here we call TaskForm component with selected task and 
                        pass a function to handle onsubmit
                        after editing we will redirect user to dashboard home page
                    */}
          <TaskForm
            task={selectedTask}
            onSubmit={(task) => {
              dispatch(editTask(id, task));
              navigate("/");
            }}
          />
        </Grid>
      </Grid>
    </main>
  );
};

export default EditTask;
