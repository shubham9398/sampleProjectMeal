import React from 'react';
import loader from './loader.gif';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ActivityList(props) {
    const { loading, activities, editActivity, setOpenSnackbar, setSnackbarMsg, setEditing, handleDelete } = props;

    const deleteActivity = (i) => {
        fetch(`http://localhost:5001/deleteWorkout/${i}`, {
            method: 'DELETE'
        }).then((response) => {
            handleDelete(i);
            setOpenSnackbar(true);
            setSnackbarMsg('Deleted activity');
            setTimeout(() => {
                setOpenSnackbar(false)
            }, 3000);
        })
        setEditing(false);
    }



    return (
        <>
            {
                loading === true
                    ? <img src={loader} alt={loader}></img>
                    : ''
            }

            {
                activities === 'not set' || activities === null
                    ? <p>No activities added yet.</p>
                    :
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.values(activities).map((activity, i) => {
                                        let { name, type, duration, _id } = activity;
                                        switch (activity.type) {
                                            case "1":
                                                type = "Lifting weights";
                                                break;
                                            case "2":
                                                type = "Cardio";
                                                break;
                                            case "3":
                                                type = "Cycling";
                                                break;
                                            default:
                                                type = "Not set";
                                        };
                                        return (
                                            <TableRow key={_id}>
                                                <TableCell>{name}</TableCell>
                                                <TableCell>{type}</TableCell>
                                                <TableCell>{duration}</TableCell>
                                                <TableCell>
                                                    <DeleteIcon
                                                        onClick={e => deleteActivity(_id)}
                                                    />
                                                    <EditIcon
                                                        onClick={e => editActivity(activity, _id)}
                                                        style={{ marginLeft: "20px" }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
};

export default ActivityList;