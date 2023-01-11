import React, {  useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { config } from "../config"
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';

export default function Register(props) {
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        status: false,
        message: ""
    })
    const navigate = useNavigate()

    const updateUserInput = (event) => {
        const { name, value } = event.target
        setFormData((prevData) => { return { ...prevData, [name]: value } })
    }


    const isFormDataValid = () => {
        if (formData.name.length > 6 && formData.email.length > 6 && formData.password.length > 8) return true
        return false
    }
    const formSubmit = async () => {
        if (!isFormDataValid()) {
            setError({
                status: true,
                message: "Invalid inputs"
            })
        } else {
            setError({
                status: false,
                message: ""
            })
            setLoading(true)
            try {
                const { name, email, password } = formData
                const body = { name, email, password }
                const resp = await axios.post(`${config.endpoint}/auth/register`, body)
                console.log(resp)
                if (!resp.status === 200) throw new Error(`registration failed.${resp.data.message}`)
                setLoading(false)
                enqueueSnackbar("registered successfully", { variant: "success" })
                navigate("/login")
            } catch (err) {
                setLoading(false)
                if (err instanceof axios.AxiosError) {
                    enqueueSnackbar(err.response.data.message, { variant: "error" })
                    setError({
                        status: true,
                        message: err.response.data.message
                    })
                } else {
                    enqueueSnackbar(err.message, { variant: "error" })
                    setError({
                        status: true,
                        message: err.message
                    })
                }

            }
        }
    }
    const home = () => {
        navigate("/")
    }
    return (
        <Box className="login-container">
            <Box sx={{
                mb: "20px"
            }}>
                <Typography variant="h4" component="h4" sx={{ cursor: "pointer" }} onClick={() => home()} >E-Cart</Typography>
                <Divider />
            </Box>
            <Box sx={{
                mb: "20px"
            }}>
                <Typography variant="span" component="span">Name</Typography>
                <input type="text" name="name" value={formData.name} onChange={updateUserInput} placeholder="Name" required />
            </Box>
            <Box sx={{
                mb: "20px"
            }}>
                <Typography variant="span" component="span">Email</Typography>
                <input type="text" name="email" value={formData.email} onChange={updateUserInput} placeholder="Email" required />
            </Box>
            <Box sx={{
                mb: "20px"
            }}>
                <Typography variant="span" component="span">Passowrd</Typography>
                <input type="password" name="password" value={formData.password} onChange={updateUserInput} placeholder="Password" required />
            </Box>
            <Button
                fullWidth
                color="primary"
                onClick={formSubmit}
                sx={{
                    backgroundColor: "#4eab4b",
                    '&:hover': {
                        backgroundColor: '#6f7370',
                    }
                }}
            >
                {loading ? <CircularProgress size="2rem" /> : "Register"}
            </Button>
            {error.status ? <Typography sx={{ color: "red" }} variant="span" component="span">{error.message}</Typography> : ""}

            <Box sx={{
                my: "20px"
            }}>
                <Typography variant="span" component="span">
                    Already have account? <Link to="/login" className="link">
                        <span>Login</span>
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}