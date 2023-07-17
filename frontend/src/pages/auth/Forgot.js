import React, { useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, Button, Card, CardContent, Container, OutlinedInput, Typography } from '@mui/material';
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';
import { forgotPassword, validateEmail } from '../../services/authService';


const Forgot = () => {

  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();
    if  (!email) {
      return toast.error("All fields are required");
    }
    if (!validateEmail(email)) {
      return toast.error("Please write a correct email.");
    }
    const userData = {
      email
    }

    await forgotPassword(userData);
    setEmail("")
  }
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
          <form onSubmit={forgot} style={{display:"flex", flexDirection:"column", gap:16}}>
            <OutlinedInput type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required name="email" />
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