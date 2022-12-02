import React from 'react';
import { useContext } from 'react';
import { userContext } from '../App';




import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';


import useStyles from '../config/theme.dashboard';

import Calendar from '../components/Calendar';


function Dashboard(props) {
  // let match = useRouteMatch();
  const userInfo= useContext(userContext)
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // const signOut = () => {
  //   props.firebase.auth.signOut()
  //   props.history.push("/");
  // }

  return (
    
            <div className={classes.root}>
                <CssBaseline />
               
                <main className={classes.content + (!open ? classes.contentClosed : classes.appBarShift)}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" className={classes.container}>
                    <Calendar 
                        
                    />
                    
                </Container>
                </main>
                
            </div>
            
         )
    
};

export default Dashboard;