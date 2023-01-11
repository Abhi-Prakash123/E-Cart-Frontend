import React from 'react';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
// import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./ProductItem.css"
import axios from 'axios';
import { config } from "../config"
import { useLogin } from '../hooks/useLogin';
import { useSnackbar } from 'notistack';

export default function ProductItem(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [login] = useLogin()
  
  const addToCart = async (productId) => {
    if(!login) return enqueueSnackbar("please login before adding to cart",{variant:"error"})
    const body = {
      productId: productId,
      quantity: 1
    }
    const apiHeaders = {
      headers:{
        "Authorization":`Bearer ${login}`,
        "Content-Type": "application/json"
      }
    }
    try{
      const resp = await axios.post(`${config.endpoint}/cart`,body,apiHeaders)
      if(resp.status === 200) throw new Error("failed to add to cart")
      props.refreshCart(resp.data.cartItems)
      enqueueSnackbar("added to cart",{variant:"success"})
    }catch(err){
      if(err instanceof axios.AxiosError){
        enqueueSnackbar(err.response.data.message,{variant:"error"})
      }else{
        enqueueSnackbar(err.message,{variant:"error"})
      }
      
    }
  }

  return (
    <Card sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "300px"
    }}>
      <div>
        <CardMedia
          component="img"
          height="150"
          image={props.details.image}
          alt={props.details.title}
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        />
        <CardContent sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <Typography
            gutterBottom
            variant="span"
            component="div"
            sx={{
              fontWeight: "900",
              mb: "20px"
            }}
          >
            {props.details.title}
          </Typography>
          <Typography className="content" gutterBottom variant="span" component="div">
            {props.details.description}
          </Typography>
          <Typography variant="h6" color="primary" sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}>
            <Rating name="read-only" value={props.details.rating} readOnly />{props.details.rating}
          </Typography>
          <Typography
            variant="span"
            color="primary"
            sx={{
              fontSize: "30px",
              mt: "5px"
            }}
          >
            <span>&#8377;</span>{props.details.cost}
          </Typography>
        </CardContent>
      </div>
      <CardActions >
        <Button
          fullWidth
          color="secondary"
          onClick={(e) => addToCart(props.details._id)}
          sx={{
            backgroundColor: "#4eab4b",
            '&:hover': {
              backgroundColor: '#6f7370',
          },
          }}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}