import { Theme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

export const globalStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      padding: theme.spacing(3),
    },
    errorRoot: {
      height: "95vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.8rem",
      },
    },

    errorButton: {
      marginTop: "1.5rem",
      borderRadius: "20px",
      textTransform: "capitalize",
      backgroundColor: "blue",
      color: "#fff",
      width: "140px",
      "&:hover": {
        backgroundColor: "blue",
        boxShadow: "none",
      },
    },

    paperCard: {
      padding: "40px 50px",
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        padding: "30px 20px",
      },
    },
  })
);
