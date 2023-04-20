import React from 'react';
import TasksList from "../Task/TaskList";
import { globalStyles } from "../../styles/globalStyles"
import AddTask from '../Task/AddTask';
import { Colors } from '../../consts';


const Home = () => {


   // using globale state for styling main page
  const classes = globalStyles();

  
  return (
    <main className={classes.content}>
      <div className={classes.drawerHeader} />
      <AddTask />
      <div style={{backgroundColor:Colors.lightBlue,padding:20,borderRadius:10}}>
       
   
        <TasksList />

      
      </div>
    </main>
  )
};

export default Home;
