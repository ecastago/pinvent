import axios from "axios";
import {toast} from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const validateEmail = (email) => { 
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
 }

 // Register User
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData);

        if (response.statusText === "OK") {
            toast.success("Registered successfully");
        }

        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
}

// Login User
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData);

        if (response.statusText === "OK") {
            toast.success("User login succesful...");
        }

        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
}

// Logout user
export const logoutUser = async (userData) => {
    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
}

// Forgot Password
export const forgotPassword = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`);

        toast.success(response.data.message);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
}

export const resetPassword = async (userData, resetToken) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`, userData);

        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
}

// get Logggin Status
export const getLoginStatus = async (userData, resetToken) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);

        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
}