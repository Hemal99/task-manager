import React from "react";
import { globalStyles } from "../../styles/globalStyles";
import { Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const classes = globalStyles();
  const navigate = useNavigate();

  return (
    <Grid className={classes.errorRoot}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <Paper className={classes.paperCard} elevation={2}>
            <h2>Page Not Found</h2>
            <Button
              variant="contained"
              className={classes.errorButton}
              onClick={() => navigate("/")}
            >
              Go Back
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
