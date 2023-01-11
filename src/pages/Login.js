import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import "./Login.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import { config } from "../config"
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useLogin } from "../hooks/useLogin"
import { useSnackbar } from 'notistack';

export default function Login(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [login, setLogin] = useLogin()
  const [formData, setFormData] = useState({
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
    if (formData.email.length > 0 && formData.password.length > 8) return true
    return false
  }
  const formSubmit = async () => {
    if (!isFormDataValid()) {
      setError({
        status: true,
        message: "Invalid form data"
      })
    } else {
      setError({
        status: false,
        message: ""
      })
      setLoading(true)
      try {
        const { email, password } = formData
        const body = { email, password }
        const resp = await axios.post(`${config.endpoint}/auth/login`, body)
        if (!resp.status === 200) throw new Error(`login failed.${resp.data.message}`)
        setLogin(resp.data.tokens.access.token)
        // localStorage.setItem('token', JSON.stringify(resp.data.tokens.access));
        // localStorage.setItem('wallet', resp.data.user.walletMoney);
        localStorage.setItem('id', resp.data.user._id);
        setLoading(false)
        enqueueSnackbar("login is successfull", { variant: "success" })
        navigate("/")
      } catch (err) {
        setLoading(false)
        if(err instanceof axios.AxiosError){
          enqueueSnackbar(err.response.data.message,{variant:"error"})
          setError({
            status: true,
            message: err.response.data.message
          })
        }else{
          enqueueSnackbar(err.message,{variant:"error"})
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
        <Typography variant="span" component="span">Email</Typography>
        <input type="text" name="email" value={formData.email} onChange={updateUserInput} placeholder="Email" />
      </Box>
      <Box sx={{
        mb: "20px"
      }}>
        <Typography variant="span" component="span">Passowrd</Typography>
        <input type="password" name="password" value={formData.password} onChange={updateUserInput} placeholder="Password" />
      </Box>
      <Button
        fullWidth
        color="primary"
        sx={{
          backgroundColor: "#4eab4b",
          '&:hover': {
            backgroundColor: '#6f7370',
        }
        }}
        onClick={formSubmit}
      >
        {loading ? <CircularProgress size="2rem" /> : "Login"}
      </Button>
      {error.status ? <Typography sx={{ color: "red" }} variant="span" component="span">{error.message}</Typography> : ""}

      <Box sx={{
        my: "20px"
      }}>
        <Typography variant="span" component="span">
          Don't have account? <Link to="/register" className="link">
            <span>Register</span>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}