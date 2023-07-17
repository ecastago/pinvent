import React, { useState } from 'react';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Box, Button, Card, CardContent, Container, OutlinedInput, Typography } from '@mui/material';
import {Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { registerUser, validateEmail } from '../../services/authService';
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME} from "../../redux/features/auth/authSlice";
import Loader from '../../components/loader/Loader';

const initialState = {
  name:"",
  email:"",
  password:"",
  password2: "",
}

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const {name, email, password, password2} = formData;

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,[name]:value
    });

  };

  const register = async(e) => {
    e.preventDefault()

    if(!name || !email || !password){
      return toast.error("All fields are required");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }

    if (!validateEmail(email)) {
      return toast.error("Please write a correct email.");
    }

    const userData = {
      name, email, password
    }
    setIsLoading(true)

    try {
      const data = await registerUser(userData);
      // console.log(data);
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{paddingLeft:"20vw", paddingRight:"20vw", paddingTop:"20vh"}}>
      {isLoading && <Loader />}
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
          <form onSubmit={register} style={{display:"flex", flexDirection:"column", gap:16}}>
            <OutlinedInput type='text' value={name} onChange={handleInputChange} placeholder='Name' required name="name" />
            <OutlinedInput type='text' value={email} onChange={handleInputChange} placeholder='Email' required name="email" />
            <OutlinedInput type='password' value={password} onChange={handleInputChange} placeholder='Password' required name="password" />
            <OutlinedInput type='password' placeholder='Confirm Password' required name="password2" value={password2} onChange={handleInputChange} />
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