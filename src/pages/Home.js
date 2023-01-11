import React,{useState} from "react"
import Header from "../components/Header";
import Products from "../components/Products";
import Grid from '@mui/material/Grid';
import Cart from "../components/Cart";
const Home = (props) => {
    const [ refreshCart,setRefreshCart ] = useState([])
    return (
        <React.Fragment>

            <Header refreshCart={setRefreshCart}/>
            <Grid container alignItems="stretch" justifyContent="center" rowSpacing={1}>

                <Grid item md={9} sm={12}>
                    <Products refreshCart={setRefreshCart}/>
                </Grid>
                <Grid item sx={{width:"100%"}} md={3} sm={12}>
                    <Cart refreshCart={refreshCart}/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Home;