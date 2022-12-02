import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';

import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';

import AddActivity from '../AddMeal';
import EditActivity from '../EditMeal';
import ActivityList from '../MealList';
import { userContext } from '../../App';

function CalendarMeal(props) {
     
    const userInfo= useContext(userContext)

    let defaultSelectedDay = {
        day: moment().format("D"),
        month: moment().month()
    };
    
       /*** HOOKS ***/
    const [dateObject, setdateObject] = useState(moment());
    const [showMonthTable, setShowMonthTable] = useState(false);
    const [selectedDay, setSelected] = useState(defaultSelectedDay);
    // Later add hook for active days from database

    /*** CALENDAR HEAD ***/
    const allMonths = moment.months();
    const currentMonth = () => dateObject.format("MMMM");
    const currentYear = () => dateObject.format("YYYY");

    const setMonth = month => {
        let monthNo = allMonths.indexOf(month);
        let newDateObject = Object.assign({}, dateObject);
        newDateObject = moment(dateObject).set("month", monthNo);
        setdateObject(newDateObject);
        setShowMonthTable(false);
    }
    const handleDelete=(i)=>{
       const updatedActivity = activities.filter( (item) => 
            item._id !== i
         )
         setActivities([...updatedActivity])
    }

    

    const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);

    /*** CALENDAR BODY ***/
    const setSelectedDay = day => {
        setSelected({
                day,
                month: currentMonthNum()
        });
         // Later refresh data
    };

    const currentMonthNum = () => dateObject.month();
    const daysInMonth = () => dateObject.daysInMonth();
    const currentDay = () => dateObject.format("D");
    const actualMonth = () => moment().format("MMMM");

    const firstDayOfMonth = () => moment(dateObject).startOf("month").format("d");

    /*** ADDING AN ACTIVITY ***/
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState(null);

    /*** ACTIVITY LIST ***/
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeDays, setActiveDays] = useState([]);

    const handleUpdate=(updatedActivity,id)=>{
        console.log("PASSESD ACTIVTY",updatedActivity)
       const updated = activities.map((activity)=>{
            if(activity._id==id){
                console.log("ID MATCh")
                return updatedActivity;
            }
            else{
                return activity;
            }
        })
        console.log("UPDATING ACTIVITUY",updated)
        setActivities([...updated])
    }

    const retrieveData = async () => {
        
        let queryDate = `${selectedDay.day}/${selectedDay.month + 1}/${selectedDay.year}`;
        console.log("date ", queryDate)
        // let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
        // ref.orderByChild("date").equalTo(queryDate).on("value", snapshot => {
        //     let data = snapshot.val();
            
        //     // setEditing(false); Add later
        // });

        const response = await fetch(`http://localhost:5001/getWorkout?username=${userInfo.username}&date=${queryDate}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        })
        const jsonResponse = await response.json();
        setActivities(jsonResponse);
        setLoading(false);

        // Update active days
        retrieveActiveDays();
    };

    const retrieveActiveDays = () => {
        // let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
        // ref.on("value", snapshot => {
        //     let data = snapshot.val();
        //     const values = Object.values(data);
        //     // Store all active day/month combinations in array for calendar
        //     const arr = values.map(obj => {
        //         return obj.date.length === 8
        //         ? obj.date.slice(0,3)
        //         : obj.date.slice(0,4)
        //     });
            console.log("Helllo");
        //     setActiveDays(arr);
        // });
    }
    const handleAddedNewActivity = (activity) => {
        setActivities([...activities, activity])
    }

    useEffect(() => {
        retrieveData();
    }, [selectedDay]);

    /*** EDIT AN ACTIVITY ***/
    const [editing, setEditing] = useState(false);
    const [activity, setActivity] = useState(null);
    const [activityKey, setActivityKey] = useState(null);

    const editActivity = (activity, i) => {
        console.log("UPDATING",i)
        setActivityKey(i);
        setEditing(true);
        setActivity(activity);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                    <CalendarHead
                        allMonths={allMonths}
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        setMonth={setMonth}
                        showMonthTable={showMonthTable}
                        toggleMonthSelect={toggleMonthSelect}
                    />
                    <CalendarBody 
                        firstDayOfMonth={firstDayOfMonth}
                        daysInMonth={daysInMonth}
                        currentDay={currentDay}
                        currentMonth={currentMonth}
                        currentMonthNum={currentMonthNum}
                        actualMonth={actualMonth}
                        setSelectedDay={setSelectedDay}
                        selectedDay={selectedDay}
                        weekdays={moment.weekdays()} 
                        activeDays={activeDays}
                    />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className="paper">
                    { editing
                        ?
                            <>
                                <h3>Edit Meals on {selectedDay.day}-{selectedDay.month + 1} </h3>
                                <EditActivity 
                                    activity={activity}
                                    activityKey={activityKey}
                                    selectedDay={selectedDay} 
                                    authUser={props.authUser}
                                    setEditing={setEditing}
                                    setOpenSnackbar={setOpenSnackbar}
                                    setSnackbarMsg={setSnackbarMsg}
                                    handleUpdate={handleUpdate}
                                   
                                />
                            </>
                        :
                            <>
                                <h3>Add Meals on {selectedDay.day}-{selectedDay.month + 1} </h3>
                                <AddActivity 
                                    selectedDay={selectedDay} 
                                    authUser={props.authUser}
                                    setOpenSnackbar={setOpenSnackbar}
                                    setSnackbarMsg={setSnackbarMsg}
                                    UpdateNewActivity={handleAddedNewActivity}
                                    userInfo={userInfo}
                                />
                            </>
                    }
                </Paper>
            </Grid>
            <Grid item xs={12} md={7}>
                <Paper className="paper">
                <h3>Meals on {selectedDay.day}-{selectedDay.month + 1}</h3>
                <ActivityList
                    loading={loading}
                    activities={activities}
                    authUser={props.authUser}
                    setOpenSnackbar={setOpenSnackbar}
                    setSnackbarMsg={setSnackbarMsg}
                    editActivity={editActivity}
                    setEditing={setEditing}
                    handleDelete={handleDelete}
                />
                </Paper>
            </Grid>
            <Snackbar 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={openSnackbar} 
                message={snackbarMsg}
            />
        </Grid>
    )
};

export default CalendarMeal;