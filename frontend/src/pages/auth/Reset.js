import React from 'react'
import PasswordIcon from '@mui/icons-material/Password';
import { Box, Button, Card, CardContent, Container, OutlinedInput, Typography } from '@mui/material';
import {Link} from "react-router-dom"


const Reset = () => {
  return (
    <Container style={{paddingLeft:"20vw", paddingRight:"20vw", paddingTop:"20vh"}}>
      <Card style={{minWidth:"300px", maxWidth:"600px"}}>
        <Box>
          <Box justifyContent="center" display="flex">
            <PasswordIcon style={{fontSize:35}}/>
          </Box>
          <Box style={{justifyContent:"center", display:"flex"}}>
            <Typography variant='h2' color="orange">Reset Password</Typography>
          </Box>
        </Box>

        <CardContent>
          <form style={{display:"flex", flexDirection:"column", gap:16}}>
            <OutlinedInput type='password' placeholder='New Password' required name="password" />
            <OutlinedInput type='password' placeholder='Confirm New Password' required name="password" />
            <Button type='submit' variant="contained">
              <Typography variant='button'>
                Reset Password
              </Typography>
            </Button>
          </form>
        </CardContent>
          <Box display="flex" justifyContent="space-evenly" marginBottom={4}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </Box>
      </Card>
    </Container>
  )
}

export default Reset;