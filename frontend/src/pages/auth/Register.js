import React from 'react';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Box, Button, Card, CardContent, Container, OutlinedInput, Typography } from '@mui/material';
import {Link} from "react-router-dom"


const Register = () => {
  return (
    <Container style={{paddingLeft:"20vw", paddingRight:"20vw", paddingTop:"20vh"}}>
      <Card style={{minWidth:"300px", maxWidth:"600px"}}>
        <Box>
          <Box justifyContent="center" display="flex">
            <PersonAddAlt1Icon style={{fontSize:35}}/>
          </Box>
          <Box style={{justifyContent:"center", display:"flex"}}>
            <Typography variant='h2' color="orange">Register</Typography>
          </Box>
        </Box>

        <CardContent>
          <form style={{display:"flex", flexDirection:"column", gap:16}}>
            <OutlinedInput type='text' placeholder='Name' required name="name" />
            <OutlinedInput type='text' placeholder='Email' required name="email" />
            <OutlinedInput type='password' placeholder='Password' required name="password" />
            <OutlinedInput type='password' placeholder='Confirm Password' required name="password" />
            <Button type='submit' variant="contained">
              <Typography variant='button'>
                Register 
              </Typography>
            </Button>
          </form>
          <Box>
            <Link to="/">Home</Link>
            <Typography variant='p'>&nbsp;Already have an account? &nbsp;</Typography>
            <Link to="/login">Login</Link>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Register