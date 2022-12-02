import React from 'react';
import { Link, useMatch, useRoutes } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';

import clsx from 'clsx';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import useStyles from '../../config/theme.dashboard';

function Sidebar(props) {
    let match = useMatch();

    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
            }}
            open={props.open}
            >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={props.handleDrawerClose}>
                <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListSubheader inset>Menu</ListSubheader>
                {/* <Link to> */}
                <Link to='dashboard'>
                    <ListItem button>
                        <ListItemIcon>
                            <EventNoteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Workouts" />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <div>
                    <ListSubheader inset>Account</ListSubheader>
                    <Link to='dashboard'>
                        <ListItem button>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                    </Link>
                    <ListItem button onClick={() => props.signOut()}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log out" />
                    </ListItem>
                </div>
            </List>
        </Drawer>
    );
}

export default Sidebar;