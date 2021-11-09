// import React, { useState, useEffect } from "react";
// import { Grid, Button, Typography } from "@material-ui/core";
// import CreateRoomPage from "./CreateRoomPage";
// import MusicPlayer from "./MusicPlayer";

// export default function Room(props) {
//   const [votesToSkip, setVotesToSkip] = useState(2)
//   const [guestCanPause, setGuestCanPause] = useState(false)
//   const [isHost, setIsHost] = useState(false)
//   const [showSettings, setShowSettings] = useState(false)
//   const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false)
//   const [song, setSong] = useState({})
//   const roomCode = props.match.params.roomCode

  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       getCurrentSong(seconds => seconds + 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   function getRoomDetails() {
//     return fetch("/api/get-room" + "?code=" + roomCode)
//       .then((response) => {
//         if (!response.ok) {
//           props.leaveRoomCallback();
//           props.history.push("/");
//         }
//         return response.json();
//       })
//       .then((data) => {
//           setVotesToSkip(data.votes_to_skip),
//           setGuestCanPause(data.guest_can_pause),
//           setIsHost(data.is_host)
//           if (isHost) {
//             authenticateSpotify();
//           }
//         });
//     }

//   function authenticateSpotify() {
//     fetch("/spotify/is-authenticated")
//       .then((response) => response.json())
//       .then((data) => {
//         setSpotifyAuthenticated(data.status)
//         console.log(data.status);
//         if (!data.status) {
//           fetch("/spotify/get-auth-url")
//             .then((response) => response.json())
//             .then((data) => {
//               window.location.replace(data.url);
//             });
//         }
//       });
//   }

//   function getCurrentSong() {
//     fetch("/spotify/current-song")
//       .then((response) => {
//         if (!response.ok) {
//           return {};
//         } else {
//           return response.json();
//         }
//       })
//       .then((data) => {
//         setSong(data)
//         console.log(data);
//       });
//   }

//   function leaveButtonPressed() {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     };
//     fetch("/api/leave-room", requestOptions).then((_response) => {
//       props.leaveRoomCallback();
//       props.history.push("/");
//     });
//   }

//   function updateShowSettings(value) {
//     setShowSettings(value)
//   }

//   function renderSettings() {
//     return (
//       <Grid container spacing={1}>
//         <Grid item xs={12} align="center">
//           <CreateRoomPage
//             update={true}
//             votesToSkip={votesToSkip}
//             guestCanPause={guestCanPause}
//             roomCode={roomCode}
//             updateCallback={getRoomDetails}
//           />
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={() => updateShowSettings(false)}
//           >
//             Close
//           </Button>
//         </Grid>
//       </Grid>
//     );
//   }

//   function renderSettingsButton() {
//     return (
//       <Grid item xs={12} align="center">
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => updateShowSettings(true)}
//         >
//           Settings
//         </Button>
//       </Grid>
//     );
//   }

//   function settings() {
//     if (showSettings) {
//       return renderSettings();
//     }
//   }
  
//     return (
//       <Grid container spacing={1}>
//         <Grid item xs={12} align="center">
//           {settings()}
//           <Typography variant="h4" component="h4">
//             Code: {roomCode}
//           </Typography>
//         </Grid>
//         <MusicPlayer {...song} />
//         <Grid item xs={12} align="center">
//           {settings()}

//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={leaveButtonPressed}
//           >
//             Leave Room
//           </Button>
//         </Grid>
//       </Grid>
//     );
//   }


import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
      spotifyAuthenticated: false,
      song: {},
    };
    this.roomCode = this.props.match.params.roomCode;
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderSettingsButton = this.renderSettingsButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.authenticateSpotify = this.authenticateSpotify.bind(this);
    this.getCurrentSong = this.getCurrentSong.bind(this);
    this.getRoomDetails();
  }

  componentDidMount() {
    this.interval = setInterval(this.getCurrentSong, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRoomDetails() {
    return fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
        if (this.state.isHost) {
          this.authenticateSpotify();
        }
      });
  }

  authenticateSpotify() {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ spotifyAuthenticated: data.status });
        console.log(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  getCurrentSong() {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({ song: data });
        console.log(data);
      });
  }

  leaveButtonPressed() {
    if (this.state.isHost) {
      // Logout spotify from Frontend but does nothing
      const url = 'https://accounts.spotify.com/en/logout'                                                                                                                                                                                                                                                                               
      const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')                                                                           
      setTimeout(() => spotifyLogoutWindow.close(), 2000)
      // This is where user is actually logging out
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };
      fetch("/spotify/logout", requestOptions);
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      this.props.leaveRoomCallback();
      this.props.history.push("/");
    });

  }

  updateShowSettings(value) {
    this.setState({
      showSettings: value,
    });
  }

  renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={this.state.votesToSkip}
            guestCanPause={this.state.guestCanPause}
            roomCode={this.roomCode}
            updateCallback={this.getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  renderHostNavBar() {
    return (
      <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          WELCOME HOST {this.isHost}
        </Typography>
      </Grid>
      </Grid>
    )
  }

  render() {
    if (this.state.showSettings) {
      return this.renderSettings();
    }
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          {this.state.isHost ? this.renderHostNavBar() : null}
          <Typography variant="h4" component="h4">
            YOU ARE VIBING IN THE ROOM: {this.roomCode}
          </Typography>
        </Grid>
        <MusicPlayer {...this.state.song} />
        {this.state.isHost ? this.renderSettingsButton() : null}
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={this.leaveButtonPressed}
          >
            {this.state.isHost ? 'Leave Room and Logout from Spotify' : "Leave This Room"}
          </Button>
        </Grid>
      </Grid>
    );
  }
}