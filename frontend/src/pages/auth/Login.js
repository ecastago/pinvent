import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { Box, Button, Card, CardContent, Container, OutlinedInput, Typography } from '@mui/material';
import {Link} from "react-router-dom"


const Login = () => {
  return (
    <Container style={{paddingLeft:"20vw", paddingRight:"20vw", paddingTop:"20vh"}}>
      <Card style={{minWidth:"300px", maxWidth:"600px"}}>
        <Box>
          <Box justifyContent="center" display="flex">
            <LoginIcon style={{fontSize:35}}/>
          </Box>
          <Box style={{justifyContent:"center", display:"flex"}}>
            <Typography variant='h2' color="orange">Login</Typography>
          </Box>
        </Box>

        <CardContent>
          <form style={{display:"flex", flexDirection:"column", gap:16}}>
            <OutlinedInput type='text' placeholder='Email' required name="email" />
            <OutlinedInput type='password' placeholder='Password' required name="password" />
            <Button type='submit' variant="contained">Login</Button>
          </form>
          <Link to="/forgot">Forgot Password</Link>

          <Box>
            <Link to="/">Home</Link>
            <Typography variant='p'>&nbsp;Don't have an account? &nbsp;</Typography>
            <Link to="/register">Register</Link>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Login