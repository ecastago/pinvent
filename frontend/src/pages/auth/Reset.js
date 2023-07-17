import React, { useState } from 'react'
import PasswordIcon from '@mui/icons-material/Password';
import { Box, Button, Card, CardContent, Container, OutlinedInput, Typography } from '@mui/material';
import {Link, useParams} from "react-router-dom"
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authService';

const initialState = {
  password: "",
  password2: "",
}

const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;

  const {resetToken} = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    });
  };

  const reset = async (e) => {
    e.preventDefault();
  
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }

    const userData = {
      password,
      password2
    }

    try {
      const data = await resetPassword(userData, resetToken);

      toast.success(data.message);
    } catch (error) {
      
    }
  }

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
          <form onSubmit={reset} style={{display:"flex", flexDirection:"column", gap:16}}>
            <OutlinedInput value={password} onChange={handleInputChange} type='password' placeholder='New Password' required name="password" />
            <OutlinedInput value={password2} onChange={handleInputChange} type='password' placeholder='Confirm New Password' required name="password2" />
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