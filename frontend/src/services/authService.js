import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData);

        if(response.statusText === "OK"){
            TransformStream.
        }
    } catch (error) {
        
    }
}