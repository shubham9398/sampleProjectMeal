import React , { useState } from 'react'
import { useContext } from 'react';
import { userContext } from '../App';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import useStyles from '../config/theme.dashboard';
import Calendar from '../components/Calendar/calendarMeal';



const MealDashboard = () => {

    const userInfo= useContext(userContext)
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [MealDashboardStatus, setMealDashboardStatus] = React.useState(true);
    console.log(MealDashboardStatus);
  return (
    <div className={classes.root}>
    <CssBaseline />
    <main className={classes.content + (!open ? classes.contentClosed : classes.appBarShift)}>
    <div className={classes.appBarSpacer} />
    <Container maxWidth="xl" className={classes.container}>
        <Calendar/>
    </Container>
    </main> 
</div>
  )
}

export default MealDashboard