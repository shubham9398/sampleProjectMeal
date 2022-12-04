import React, { useState } from 'react';
// import { withFirebase } from '../Firebase';

import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function EditActivity(props) {
    const classes = useStyles();

    const { authUser, activity, activityKey, setEditing, setOpenSnackbar, setSnackbarMsg, handleUpdate } = props;
    //const uid = authUser.uid;

    // Set default activity object
    const defaultActivity = {
        name: activity.name,
        type: activity.type,
        duration: activity.duration,
        date: activity.date
    }

    const [newActivity, setNewActivity] = useState(defaultActivity);

    const handleChange = e => {
        const { name, value } = e.target
        setNewActivity({
            ...newActivity,
            [name]: value
        });
    }

    const handleSlider = e => {
        console.log("TARDET",e.target)
        const duration = `${e.target.value} mins`;
        setNewActivity({ ...activity, duration: duration });
    }

    const isValid = newActivity.name === '';

    // Add the activity to firebase via the API made in this app
    const handleSubmit = action => {


        const response = fetch(`http://localhost:5001/updateWorkout/${activity._id}`, {      //Api call to update the todo status
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newActivity)
        }).then((resp) => {
            resp.json()
                .then((response) => {
                    setEditing(false);
                    // Show alert and hide after 3sec
                    setOpenSnackbar(true);
                    setSnackbarMsg('Updated activity');
                    setTimeout(() => {
                        setOpenSnackbar(false)
                    }, 3000)
                    handleUpdate(response, response._id)
                }
                )

        })



    }

    return (
        <form noValidate onSubmit={e => e.preventDefault()}>
            <FormControl className={classes.formControl}>
                <TextField
                    style={{ marginTop: '5px' }}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={newActivity.name}
                    label="Activity name"
                    name="name"
                    onChange={handleChange}
                />
                <div style={{ marginTop: '20px', marginBottom: '30px' }}>
                    <Typography id="discrete-slider" gutterBottom>
                        Type
                    </Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={newActivity.type}
                        style={{ minWidth: '100%' }}
                        name="type"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Lifting Weights</MenuItem>
                        <MenuItem value={2}>Cardio</MenuItem>
                        <MenuItem value={3}>Cycling</MenuItem>
                    </Select>
                </div>
                <Typography id="discrete-slider" gutterBottom>
                    Duration
                </Typography>
                {/* //Need to change slider */}
                <Slider
                    size="small"
                    defaultValue={60}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    onChange={handleSlider}
                />
            </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleSubmit('add')}
                disabled={isValid}
            >
                Save activity
            </Button>
        </form>
    )
};

export default EditActivity;