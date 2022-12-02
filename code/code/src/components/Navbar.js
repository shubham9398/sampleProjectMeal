import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import { userContext } from '../App';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';



import Logo from '../assets/images/Hanuman1.png';

const Navbar = () => {
  const userInfo = useContext(userContext);
  
  return (
    <Stack direction="row" justifyContent="space-around" sx={{ gap: { sm: '123px', xs: '40px' }, mt: { sm: '32px', xs: '20px' } }} px="20px">
      <Link to="/">
        <img src={Logo} alt="logo" style={{ width: '68px', height: '68px', margin: '0px 20px' }} />
      </Link>
      <Stack
        direction="row"
        gap="40px"
        fontFamily="Alegreya"
        fontSize="24px"
        alignItems="flex-end"
      >
        <Link to="/" style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #FF2625' }}>Home</Link>
        
        <a href='#exercises' style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #FF2625' }}>Exercises</a>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #FF2625' }}>Exsercises Dashboard</Link>
        <Link to="/Mealdashboard" style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #FF2625' }}>Meal Dashboard</Link>

      </Stack>
      <Stack  direction="row"
        gap="40px"
        fontFamily="Alegreya"
        fontSize="24px"
        alignItems="flex-end" justifyContent='none'>
      <Typography component="p" variant='h5' >
        {userInfo.username}
      </Typography>
      </Stack>
    </Stack>)
};

export default Navbar;
