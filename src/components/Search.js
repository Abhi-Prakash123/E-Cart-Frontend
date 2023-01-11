import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import "./Search.css"
const Search = (props) => {
    return (
        <Box
            sx={{
                width: 500,
                height: 35,
                maxWidth: '100%',
                border: "2px solid #616161",
                display: "flex",
                borderRadius: "25px",
            }}
        >
            <input className="search-bar" placeholder="search.." type={"text"} />
            <Button ><SearchIcon color="secondary" /></Button>
        </Box>
    )
}

export default Search;