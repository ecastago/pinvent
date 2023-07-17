import React, { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { Box, Button, Card, CardContent, Container, OutlinedInput, Typography } from '@mui/material';
import {Link, useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser, validateEmail } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
  email: "",
  password: "",
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    });
  };

  const login = async (e) => {
    e.preventDefault()

    if ( !email || !password) {
      return toast.error("All fields are required");
    }
    if (!validateEmail(email)) {
      return toast.error("Please write a correct email.");
    }
    const userData = {
      email, 
      password
    }

    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <Container style={{paddingLeft:"20vw", paddingRight:"20vw", paddingTop:"20vh"}}>
      {isLoading && <Loader />}
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
          <form onSubmit={login} style={{display:"flex", flexDirection:"column", gap:16}}>
            <OutlinedInput type='text' placeholder='Email' required name="email" value={email} onChange={handleInputChange} />
            <OutlinedInput type='password' placeholder='Password' required name="password" value={password} onChange={handleInputChange} />
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