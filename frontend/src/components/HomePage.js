import React, { useState, useEffect } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Info from "./info";

export default function HomePage(props) {
  const [roomCode, setRoomCode] = useState(null)

  useEffect(() => {
    fetch("/api/user-in-room")
    .then((response) => response.json())
    .then((data) => {
      setRoomCode(data.code)
    })
  })

  function renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Vibe
            </Button>
            <Button color="default" to="/info" component={Link}>
              Info
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Vibe
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  function clearRoomCode() {
    setRoomCode(null)
  }


    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return roomCode ? (
                <Redirect to={`/room/${roomCode}`} />
              ) : (
                renderHomePage()
              );
            }}
          />
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/info" component={Info} />
          <Route path="/create" component={CreateRoomPage} />
          <Route
            path="/room/:roomCode"
            render={(props) => {
              return <Room {...props} leaveRoomCallback={clearRoomCode} />;
            }}
          />
        </Switch>
      </Router>
    );
  }