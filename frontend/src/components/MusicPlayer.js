import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export default function MusicPlayer(props) {

  function pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  }

  function playSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  }

  function skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  }


    const songProgress = (props.time / props.duration) * 100;

    return (
      <Card>
        <Grid container alignItems="center">
          <Grid item align="center" xs={4}>
            <img src={props.image_url= "https://label-engine.com/news/wp-content/uploads/2017/07/Spotify-Logo-Square.jpg"} height="100%" width="100%" />
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
              {props.title ? props.title : "Nothing currently playing"}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {props.artist ? props.artist : ""}
            </Typography>
            <div>
              <IconButton
                onClick={() => {
                  props.is_playing ? pauseSong() : playSong();
                }}
              >
                {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              {/* arrow function is used so we DONT have to BIND the skipsong function */}
              <IconButton onClick= {() => skipSong()}>
                <SkipNextIcon /> {props.votes} /{"     "} {props.votes_required}
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    );
  }