import React, { FormEvent, useState } from "react";
import { nanoid } from "nanoid";
import { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

import { ITaskItem } from "../../interfaces/index";
import { TaskFormMode, TaskHistory } from "../../consts/index";
import useTaskHistory from "../../hooks/useTaskHistory";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// custom styles of this component
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginBottom: 30,
    },
    select: {
      border: 0,
      fontSize: 16,
      color: "#000",
      display: "block",
      width: "100%",
      borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
      marginBottom: 30,
      paddingBottom: 5,
    },
    floatRight: {
      float: "right",
    },
    historyText: {
      marginTop: 5,
      marginBottom: 5,
    },
  })
);

interface IComponentProps {
  task?: ITaskItem | undefined;
  onSubmit: (task: ITaskItem) => void;
}

// this Component will handle our task form which can be used for add or edit a task
const TaskForm: React.FC<IComponentProps> = (props) => {
  // define classes as a const filled bu useSyles of Material UI
  // now we can use defined classed in oue elements
  const classes = useStyles();

  // this error state will define to handle errors
  const [error, setError] = useState("");

  // this form can handle Edit of Add. So we first check the Mode
  const [mode] = useState(props.task ? "edit" : "create");
  const [status, setStatus] = useState(
    props.task ? props.task.status : TaskHistory.Todo
  );

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  // we distract the data to fill form elements in case of editing
  const [id] = useState(props.task ? props.task.id : "");
  const [title, setTitle] = useState(props.task ? props.task.title : "");
  const [description, setDescription] = useState(
    props.task ? props.task.description : ""
  );

  const taskHistoryBasedStatus = useTaskHistory(status);

  // handler for chaning title
  const onTitleChange = (e: FormEvent) => {
    const title = (e.target as HTMLInputElement).value;
    setTitle(title);
  };

  // handler for chaning description
  const onDescriptionChange = (e: FormEvent) => {
    const description = (e.target as HTMLTextAreaElement).value;
    setDescription(description);
  };

  // handler for chaning status
  const onStatusChange = (e: FormEvent) => {
    const status = (e.target as HTMLSelectElement).value;
    setStatus(status);
  };

  // handle the form submit
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      setError("'Please fill Title and Description.'");
    } else {
      setError("");

      if (mode === TaskFormMode.Create) {
        props.onSubmit({
          id: nanoid(8),
          title,
          description,
          status: status,
        });
      } else {
        props.onSubmit({
          id,
          title,
          description,
          status: status,
        });
      }
    }
  };

  return (
    <>
      {/* here we show our errors */}

      {error && (
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError("");
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      )}

      <form onSubmit={submitHandler}>
        <TextField
          fullWidth
          variant="filled"
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
          style={{ marginBottom: 30 }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          variant="filled"
          placeholder="Description"
          value={description}
          onChange={onDescriptionChange}
          style={{ marginBottom: 30 }}
        />

        {mode === TaskFormMode.Create && (
          <FormControl fullWidth variant="filled" sx={{ mb: 5, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={status}
              onChange={handleChange}
            >
              <MenuItem value={TaskHistory.Todo}>{TaskHistory.Todo}</MenuItem>
              <MenuItem value={TaskHistory.InProgress}>
                {TaskHistory.InProgress}
              </MenuItem>
              <MenuItem value={TaskHistory.InQA}>{TaskHistory.InQA}</MenuItem>
              <MenuItem value={TaskHistory.Done}>{TaskHistory.Done}</MenuItem>
              <MenuItem value={TaskHistory.Deployed}>
                {TaskHistory.Deployed}
              </MenuItem>
              <MenuItem value={TaskHistory.Blocked}>
                {TaskHistory.Blocked}
              </MenuItem>
            </Select>
          </FormControl>
        )}

        {/* 
                    bases on mode (EDIT or ADD) we trigger the select element
                    this select element will be shown just when we are editing a task
                    it will be filled by task history which we got from our useHistoryHook                    
                */}

        {mode === TaskFormMode.Edit ? (
          <>
            <select
              value={status}
              onChange={onStatusChange}
              className={classes.select}
            >
              {taskHistoryBasedStatus.map((status: string, index) => (
                <option key={index}>{status}</option>
              ))}
            </select>
          </>
        ) : undefined}

        {/* 
                    bases on mode (EDIT or ADD) we will show different buttons with different text
                */}
        {mode === TaskFormMode.Create ? (
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            {" "}
            + Add{" "}
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            {" "}
            Edit Task{" "}
          </Button>
        )}

        {/* 
                    and a cancel button for both Edit and Add situation                  
                */}
      </form>
    </>
  );
};

export default TaskForm;
