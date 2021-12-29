import React, { useState, useEffect } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography} from "@material-ui/core";
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Info from "./info";
import albumCoverList from "../../static/album_covers/albumCoverList"



export default function HomePage(props) {
  const [roomCode, setRoomCode] = useState(null)
  const[displayAlbums, setDisplayAlbums] = useState(shuffle(albumCoverList))



  useEffect(() => {
  // const interval = setInterval(() => {
  //   console.log('This will run approximately every 14 seconds!');
  //   fetch("https://theaudiodb.p.rapidapi.com/mostloved.php?format=track",  {
  //     "method": "GET",
  //     "headers": {
  //       "x-rapidapi-host": "theaudiodb.p.rapidapi.com",
  //       "x-rapidapi-key": ""
  //   }})
    
  //     .then((response) => response.json())
  //     .then(response => {
  //       setAlbumCover(response.loved[getRandomInt(0, 49)]["strTrackThumb"])
  //       console.log("RESPONSE:", albumCover);
  // })
  //   .catch(err => {
	//   console.error("ERROR:", err);
  // });
  // }, 10000);
    fetchRoom();
    getAlbumCover();
 })

  function fetchRoom()  {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code)
      })
  }

  function getAlbumCover(){
    const interval = setInterval(() => {
      console.log("Album covers should shuffle every 20 sec")
      setDisplayAlbums(shuffle(albumCoverList))
    }, 200000);
  }

  function renderHomePage() {
    return (
      <Grid container spacing={3}>
      <ImageList sx={{ width: 500, height: 500 }} cols={3} rowHeight={145}>
      {shuffle(displayAlbums).map((cover) => (
        <ImageListItem key={cover.img}>
          <img
            src={`${cover.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${cover.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={"NOT AVAILABLE"}
            loading="lazy"
          />
        </ImageListItem>
      ))}
          </ImageList>
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


  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array.slice(0,9);
  }
