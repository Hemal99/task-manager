import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import { ITaskItem } from "../../interfaces/index";

// custom styles of this component
const useStyles = makeStyles({
  root: {
    marginTop: 5,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#4caf50",
    display: "inline-block",
    padding: "0 15px",
    borderRadius: "15px",
  },
  pos: {
    fontSize: 10,
    marginBottom: 12,
  },
  editIcon: {
    fontSize: 16,
  },

  description: {
    wordWrap: "break-word",
  },
});

// This Component will render the UI of each TaskItem

const TaskItem: React.FC<ITaskItem> = ({ id, title, description, status }) => {
  // define classes as a const filled bu useSyles of Material UI
  // now we can use defined classed in oue elements

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>

        <Typography
          variant="body2"
          component="p"
          className={classes.description}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions style={{ justifyContent: "space-between" }}>
        <Typography className={classes.title} gutterBottom>
          {status}
        </Typography>
        {/*
                        This icon linked to the EditTask page with the id of task as a parameter
                        we need this parameter to handle edit Task 
                    */}
        <IconButton
          size="small"
          aria-label="edit"
          component={Link}
          to={`/edit/${id}`}
          color="primary"
        >
          <EditIcon className={classes.editIcon} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskItem;
