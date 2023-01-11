import React, { useState, useEffect } from "react"
import Header from "../components/Header";
import Box from '@mui/material/Box';
import { Typography, Divider, Button } from "@mui/material";
import { useSnackbar } from 'notistack';
import "./Checkout.css"
import { config } from "../config"
import axios from "axios";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from 'react-router-dom';

const Checkout = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [checkoutData, setCheckoutData] = useState([])
    const [address, setAddress] = useState("")
    const [login] = useLogin()
    const navigate = useNavigate()
    useEffect(() => {
        const collectApiData = async () => {
            const apiHeaders = {
                headers: {
                    "Authorization": `Bearer ${login}`,
                    "Content-Type": "application/json"
                }
            }
            try {
                const resp = await axios.get(`${config.endpoint}/cart`, apiHeaders)
                if (resp.status !== 200) throw new Error("No cart data")
                setCheckoutData(resp.data.cartItems)
            } catch (err) {
                setCheckoutData([])
            }
        }
        collectApiData()
    }, [])

    const updateAddress = async () => {
        const body = {
            address: address,
        }
        const apiHeaders = {
            headers: {
                "Authorization": `Bearer ${login}`,
                "Content-Type": "application/json"
            }
        }
        try {
            const userId = localStorage.getItem("id")
            const resp = await axios.put(`${config.endpoint}/users/${userId}`, body, apiHeaders)
            if (resp.status !== 200) throw new Error("failed to update the address")
            await axios.put(`${config.endpoint}/cart/checkout`, {}, apiHeaders)
            // if (checkoutResp.status !== 200) throw new Error("failed to update the address")
            enqueueSnackbar("order placed", { variant: "success" })
            navigate("/thanks")
        } catch (err) {
            if (err instanceof axios.AxiosError) {
                enqueueSnackbar(err.response.data.message, { variant: "error" })
            } else {
                enqueueSnackbar(err.message, { variant: "error" })
            }
        }

    }
    var totalProduct = 0;
    var totalCost = 0;
    checkoutData.forEach((item) => {
        totalProduct = totalProduct + item.quantity
        totalCost = totalCost + (item.product.cost * item.quantity)
    })
    if (checkoutData.length === 0) {
        return (
            <>
                <Header search={false} />
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"

                }}>
                    <img
                        src={`https://cdni.iconscout.com/illustration/free/thumb/empty-cart-4085814-3385483.png`}
                        alt="Cart is Empty"
                        loading="lazy"
                        width="300"
                    />
                    <Typography variant="span">Cart is Empty</Typography>
                </Box>

            </>
        )
    }

    return (
        <React.Fragment>
            <Header search={false} />
            <Box className="checkout-container">
                <Typography variant="h4"> Order Details</Typography>
                <Divider />
                <Box className="product-detail-row">
                    <Typography variant="span"> Total Product</Typography>
                    <Typography variant="span"> {totalProduct}</Typography>
                </Box>
                <Box className="product-detail-row">
                    <Typography variant="span"> Subtotal</Typography>
                    <Typography variant="span"> &#8377;{totalCost}</Typography>
                </Box>
                <Box className="product-detail-row">
                    <Typography variant="span"> Delivery Charge</Typography>
                    <Typography variant="span"> &#8377;0</Typography>
                </Box>
                <Box className="product-detail-row">
                    <Typography variant="span"> Total Charge</Typography>
                    <Typography variant="span"> &#8377;{totalCost}</Typography>
                </Box>
                <Typography variant="h4"> Address</Typography>
                <Divider />
                <textarea className="user-address" value={address} onChange={(event) => setAddress(event.target.value)} name="address" rows="4" cols="50">
                    At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
                </textarea>
                <Box sx={{display:"flex",justifyContent: "center"}}>
                <Button sx={{
                    backgroundColor: "#4eab4b",
                    color:"white",
                    '&:hover': {
                        backgroundColor: '#6f7370',
                        color: '#3c52b2',
                    },
                }} onClick={updateAddress}>Place Order</Button>
                </Box>
                
            </Box>
        </React.Fragment>
    )
}

export default Checkout;