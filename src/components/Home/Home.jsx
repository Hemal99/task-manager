import React from 'react';
import TasksList from "../Task/TaskList";
import { globalStyles } from "../../styles/globalStyles"
import AddTask from '../Task/AddTask';


const Home = () => {


   // using globale state for styling main page
  const classes = globalStyles();

  
  return (
    <main className={classes.content}>
      <div className={classes.drawerHeader} />
      <AddTask />
      <TasksList />
    </main>
  )
};

export default Home;
