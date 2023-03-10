import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Grid, CircularProgress, Box } from '@mui/material';
import { config } from "../config"
import axios from "axios";
const getProducts = async (options) => {
    try {
        const resp = await axios.get(`${config.endpoint}/products`)
        if (resp.status === 200) return resp.data
        throw new Error(`server error : ${resp.data.message}`)
    } catch (err) {
        return []
    }
}
const Products = (props) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const abortController = new AbortController()
        const collectAllProducts = async () => {
            const prod = await getProducts({ signal: abortController.signal })
            setProducts(() => prod)
        }
        collectAllProducts()
        return () => {
            abortController.abort()
        }

    }, [])
    const productList = products.map((item, index, arr) => (
        <Grid item key={index} style={{ display: 'flex' }}>
            <ProductItem refreshCart={props.refreshCart} details={item} />
        </Grid>
    ))
    if (productList.length === 0) return (
        <Box sx={{
            width: "100%", display: "flex", justifyContent: "center",
            alignItems: "center",
            height: "100%"
        }}>
            <CircularProgress />
        </Box>
    )
    return (
        <React.Fragment>
            <Grid container alignItems="stretch" justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {productList}
            </Grid>
        </React.Fragment>
    )
}

export default Products