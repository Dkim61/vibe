import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton, Icon } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
    JOIN: "pages.join",
    CREATE: "pages.create",
}

export default function Info(props) {
    // setting up state in functional component
    const [page, setPage] = useState(pages.JOIN);

    function joinInfo() {
        return "Join Page";
    } 

    function createInfo() {
        return "Create Page";
    }

    useEffect(() => {
        console.log("RAN")
        // equivilent of component unmount
        return () => console.log("cleanup");
    })

    return (
        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">
            What is Vibez?
            </Typography>
            <Typography component="h4" variant="h4">
            Vibez is the perfect companion for your next party or social gathering that needs some Tunes!
            A User can create a room where they sign in through Spotify and can invite their guests.
            After the User sets up the settings of the room, guests can enter by entering the room code.
            Guests can see the information of the current song being played and even vote to skip the song!
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Typography variant="body=1">
                { page === pages.JOIN ? joinInfo() : createInfo() }
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <IconButton onClick={() => {
                page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE)
            }}
            >
                { page === pages.CREATE ? (
                    <NavigateBeforeIcon/> 
                ) : (
                    <NavigateNextIcon/> 
                )}
            </IconButton>
        </Grid>
        <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" to="/" component={Link}>
                Back
            </Button>
        </Grid>
        </Grid>
    );
}