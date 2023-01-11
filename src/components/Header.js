import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Search from './Search';
import { useSnackbar } from 'notistack';
import { useLogin } from "../hooks/useLogin"


const Header = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [login, setLogin] = useLogin()

    const userLogin = () => {
        navigate("/login")
    }
    const userLogout = () => {
        setLogin("")
        localStorage.clear('id');
        // props.refreshCart([])
        enqueueSnackbar("logout successfull.",{variant:"success"})
        window.location.reload(true)
    }
    const home = () => {
        navigate("/")
    }

    return (
        <Box sx={{ flexGrow: 1, mb: "20px" }}>
            <AppBar position="static" >
                <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
                    <Typography sx={{cursor:"pointer"}} onClick={()=> home()} color="inherit" variant="h6" component="h6">
                        E-Cart
                    </Typography>
                    {props.search === false ? "":<Search />}
                    {
                        login ?
                            <Button color="secondary" onClick={userLogout} variant="outlined">Sign Out</Button>
                            :
                            <Button color="secondary" onClick={userLogin} variant="outlined">Sign In</Button>

                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default Header