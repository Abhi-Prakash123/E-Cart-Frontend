import React from "react"
import Header from "../components/Header";
import { Box, Typography,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Thanks = (props) => {
    const navigate = useNavigate()
    const home = () => {
        navigate("/")
    }
    return (
        <React.Fragment>
            <Header search={false} />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <img width="200" src="https://corollatwincam-indonesia.com/assets/front/images/success.png" />
                <Typography variant="h4"> Order Placed successfully</Typography>
                <Button 
                variant="conatined"
                onClick={home}
                sx={{
                    mt:"30px",
                    backgroundColor: "#4eab4b",
                    '&:hover': {
                      backgroundColor: '#6f7370',
                  }
                  }}
                >Keep Shopping</Button>
            </Box>
        </React.Fragment>
    )
}

export default Thanks;