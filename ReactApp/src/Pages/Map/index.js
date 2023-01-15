import React, { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  Avatar,
  Button,
  Fab,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import MapCards from "../../Components/MapCards";
import StartActivity from "../../Components/StartActivity";
import { updateActiveUser, getSpots } from "../../Slices/spots";
import { useDispatch } from "react-redux";
import markerLogo from "../../assets/marker.svg";
import DeleteIcon from "@mui/icons-material/Delete";

const GOOGLE_API = process.env.REACT_APP_GOOGLE_MAPS_APIKEY;
const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL;

const markers = [
  {
    id: 1,
    name: "Chicago, Illinois",
    position: { lat: 51.1165, lng: 22.6084 },
  },
  {
    id: 2,
    name: "Denver, Colorado",
    position: { lat: 51.1165, lng: 22.9084 },
  },
  {
    id: 3,
    name: "Los Angeles, California",
    position: { lat: 51.1165, lng: 21.6084 },
  },
  {
    id: 4,
    name: "New York, New York",
    position: { lat: 50.1165, lng: 22.6084 },
  },
];

const containerStyle = {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
};

function Map({ spots }) {
  const mapRef = useRef(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [activityIsOpened, setActivityIsOpened] = useState(false);
  const [expirationDate, setExpirationDate] = useState();
  const [center, setCenter] = useState({
    lat: 51.2465,
    lng: 22.5684,
  });

  console.log(activeMarker, center);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleActiveMarker = (marker, lat, lng) => {
    map.panTo({ lat, lng });
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    function callback(map) {
      console.log("Onload");
      const bounds = new window.google.maps.LatLngBounds(center);

      markers.forEach(({ position }) => bounds.extend(position));
      map.fitBounds(bounds);

      setMap(map);
    },
    [center]
  );

  const onUnmount = useCallback(function callback(map) {
    console.log("OnUnmount");
    setMap(null);
  }, []);

  const handleClose = () => {
    setActiveMarker(null);
    setActivityIsOpened(false);
  };

  const handleSubmit = (id) => {
    const activeUsersNames = spots[id - 1].attributes.activeUsers.map(
      (user) => user.username
    );

    !activeUsersNames.includes(user.user.username)
      ? dispatch(
          updateActiveUser({
            id: id,
            token: JSON.parse(localStorage.getItem("user")).jwt,
            payload: [
              ...(spots[id - 1].attributes.activeUsers || []),
              {
                username: user.user.username,
                firstname: user.user.firstname,
                lastname: user.user.lastname,
                profileImage: user.user.profileImage,
                timestamp: expirationDate,
              },
            ],
          })
        )
      : dispatch(
          updateActiveUser({
            id: id,
            token: JSON.parse(localStorage.getItem("user")).jwt,
            payload: [
              ...(spots[id - 1].attributes.activeUsers || []).filter(
                (activeUser) => activeUser.username !== user.user.username
              ),
            ],
          })
        );

    dispatch(getSpots(user));
  };

  const handleRemoveSpots = (id) => {
    dispatch(
      updateActiveUser({
        id: id,
        token: JSON.parse(localStorage.getItem("user")).jwt,
        payload: [
          ...(spots[id - 1].attributes.activeUsers || []).filter(
            (activeUser) => activeUser.username !== user.user.username
          ),
        ],
      })
    );
    dispatch(getSpots(user));
  };

  return isLoaded ? (
    <Grid style={{ position: "fixed" }}>
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={() => setActiveMarker(null)}
        style={{ position: "fixed" }}
        defaultClickableIcons={false}
      >
        {spots.map(
          ({
            id,
            attributes: { name, desc, image, latitude, longitude, activeUsers },
          }) => (
            <Marker
              key={id}
              position={{ lat: latitude, lng: longitude }}
              onClick={() => handleActiveMarker(id, latitude, longitude)}
              icon={{
                url: markerLogo,
                scale: 3,
              }}
            >
              {activeMarker === id ? (
                <InfoWindowF onCloseClick={() => handleClose()}>
                  <Box sx={{ maxWidth: "200px", textAlign: "center" }}>
                    <div>{name}</div>
                    <Grid sx={{ display: "flex", flexFlow: "wrap", mt: 1 }}>
                      {activeUsers ? (
                        Object.keys(activeUsers) !== [] &&
                        Object.keys(activeUsers).map((activeUser, i) => (
                          <Tooltip
                            title={activeUsers[activeUser].firstname}
                            arrow
                            placement="top"
                          >
                            <Avatar
                              alt={`${activeUsers[activeUser].firstname} ${activeUsers[activeUser].lastname}`}
                              src={
                                UPLOADS_URL +
                                activeUsers[activeUser].profileImage
                              }
                              sx={{
                                width: 30,
                                height: 30,
                                m: "4px",
                                border:
                                  activeUsers[activeUser].username ===
                                    user.user.username && "1px solid red",
                              }}
                            />
                          </Tooltip>
                        ))
                      ) : (
                        <Typography
                          variant="h6"
                          component="h6"
                          sx={{ alignSelf: "center" }}
                        >
                          No active users
                        </Typography>
                      )}
                    </Grid>

                    {user.user.username &&
                    activityIsOpened &&
                    activeUsers
                      .map(
                        (activeUser) =>
                          activeUser.username === user.user.username
                      )
                      .some(Boolean) ? (
                      <Button
                        variant="outlined"
                        sx={{
                          color: "#e75a5a",
                          fontSize: 11,
                          border: "1px solid #e75a5a",
                          py: 0,
                          mt: 3,
                          "&:hover": {
                            border: "1px solid #ff2c2c",
                          },
                        }}
                        endIcon={
                          <IconButton aria-label="Remove my activity">
                            <DeleteIcon
                              sx={{
                                color: "#e75a5a",
                                "&:hover": {
                                  color: "#ff2c2c",
                                },
                              }}
                            />
                          </IconButton>
                        }
                        onClick={() => handleRemoveSpots(id)}
                      >
                        Remove my activity
                      </Button>
                    ) : activityIsOpened ? (
                      <>
                        <Grid sx={{ textAlign: "-webkit-center" }}>
                          <StartActivity
                            setExpirationDate={setExpirationDate}
                          />
                        </Grid>
                        <Fab
                          variant="extended"
                          size="medium"
                          color="primary"
                          aria-label="add"
                          sx={{ m: 2 }}
                          onClick={() => handleSubmit(id)}
                        >
                          <AddIcon sx={{ mr: 1 }} />
                          Submit
                        </Fab>
                      </>
                    ) : (
                      <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add"
                        sx={{ m: 2 }}
                        onClick={() => setActivityIsOpened(true)}
                      >
                        <AddIcon sx={{ mr: 1 }} />
                        Add Me
                      </Fab>
                    )}
                  </Box>
                </InfoWindowF>
              ) : null}
            </Marker>
          )
        )}
        <MapCards
          setActive={setActiveMarker}
          activeMarker={activeMarker}
          map={map}
        />
      </GoogleMap>
    </Grid>
  ) : (
    <></>
  );
}

export default React.memo(Map);
