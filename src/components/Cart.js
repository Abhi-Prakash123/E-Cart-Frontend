import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import "./Cart.css"
import axios from 'axios';
import { config } from "../config"
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const updateCartItem = async (productId, quantity, token) => {
    if (quantity === "") return
    const body = {
        productId: productId,
        quantity: quantity
    }
    const apiHeaders = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    try {
        const resp = await axios.put(`${config.endpoint}/cart`, body, apiHeaders)
        if (!(resp.status === 200 || resp.status === 204)) throw new Error("failed to update the cart")
        return resp.data.cartItems
    } catch (err) {
        return []
    }
}


const CartItem = (props) => {
    const [login] = useLogin()
    const setQuantity = async(quantity) => {
        const data = await updateCartItem(props.data.product._id, quantity, login)
        props.updateCartData(data)
    }

    return (
        <Card sx={{ display: 'flex', justifyContent: "space-between", my: "4px", width: "100%" }}>
            <CardContent sx={{ display: 'flex', flexDirection: "column", justifyContent: "space-evenly" }}>
                <Typography sx={{ fontWeight: "900" }} component="div" variant="span">
                    {props.data['product']['title']}
                </Typography>
                <Box>
                    <Typography component="div" variant="span">
                        Quantity : <input name="quantity" value={props.data.quantity} onChange={(e) => setQuantity(e.target.value)} type="number" min="0" max="10" style={{ width: "80px", height: "30px" }} />
                    </Typography>
                </Box>

            </CardContent>
            <CardMedia
                component="img"
                height="100"
                sx={{ width: "80px" }}
                image={props.data['product']['image']}
                alt={props.data['product']['title']}
            />
        </Card>
    )
}
const EmptyCart = (props) => {
    return (
        <>
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
const Cart = (props) => {
    const [cartData, setCartData] = useState([])
    const [login] = useLogin()
    const navigate = useNavigate()
    useEffect(() => {
        const collectCartData = async () => {
            const apiHeaders = {
                headers: {
                    "Authorization": `Bearer ${login}`,
                    "Content-Type": "application/json"
                }
            }
            try {
                const resp = await axios.get(`${config.endpoint}/cart`, apiHeaders)
                if (resp.status !== 200) throw new Error("No cart data")
                setCartData(resp.data.cartItems)
            } catch (err) {
                setCartData([])
            }
        }
        collectCartData()

    }, [props.refreshCart])

    const checkout = () => {
        navigate("/checkout")
    }
    var total = 0;
    const cartItems = cartData.map((item, index) => {
        total = total + (item.product.cost * item.quantity)
        return <CartItem updateCartData={setCartData} data={item} key={index} />
    })
    return (
        <Box className="cart-container">
            <Box sx={{ width: "100%", borderBottom: "2px solid #282928" }}>
                <Typography variant="h5" component="h5" >Cart</Typography>
            </Box>
            {cartItems.length === 0 ? <EmptyCart /> : cartItems}
            {cartItems.length === 0 ? "" : <Typography sx={{ my: "20px" }} variant="span" component="span" >Total : &#8377;{total}</Typography>}
            {cartItems.length === 0 ? "" : <Button variant="contained" onClick={checkout} >checkout</Button>}
        </Box>
    )
}

export default Cart;