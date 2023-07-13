import React from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, Button, Card, CardContent, Container, OutlinedInput, Typography } from '@mui/material';
import {Link} from "react-router-dom"


const Forgot = () => {
  return (
    <Container style={{paddingLeft:"20vw", paddingRight:"20vw", paddingTop:"20vh"}}>
      <Card style={{minWidth:"300px", maxWidth:"600px"}}>
        <Box>
          <Box justifyContent="center" display="flex">
            <MailOutlineIcon style={{fontSize:35}}/>
          </Box>
          <Box style={{justifyContent:"center", display:"flex"}}>
            <Typography variant='h2' color="orange">Forgot Password</Typography>
          </Box>
        </Box>

        <CardContent>
          <form style={{display:"flex", flexDirection:"column", gap:16}}>
            <OutlinedInput type='text' placeholder='Email' required name="email" />
            <Button type='submit' variant="contained">
              <Typography variant='button'>
                Get Reset Email 
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

export default Forgot