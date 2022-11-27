import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Avatar, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import MapCards from "../../Components/MapCards";

const GOOGLE_API = process.env.REACT_APP_GOOGLE_MAPS_APIKEY;

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
  width: "100vw",
  height: "100vh",
  // position: "fixed",
  // width: "100vw",
  // height: "100%",
};

const center = {
  lat: 51.2465,
  lng: 22.5684,
};

function Map({ spots }) {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    console.log("Onload");
    const bounds = new window.google.maps.LatLngBounds(center);

    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    console.log("OnUnmount");
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
      position="fixed"
      onClick={() => setActiveMarker(null)}
    >
      {spots.map(
        ({ id, attributes: { name, desc, image, latitude, longitude } }) => (
          <Marker
            key={id}
            position={{ lat: latitude, lng: longitude }}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                <Box sx={{ maxWidth: "200px", textAlign: "center" }}>
                  <div>{name}</div>
                  <Grid sx={{ display: "flex", flexFlow: "wrap", mt: 1 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 30, height: 30, m: "4px" }}
                    />
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 30, height: 30, m: "4px" }}
                    />
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 30, height: 30, m: "4px" }}
                    />
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 30, height: 30, m: "4px" }}
                    />
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 30, height: 30, m: "4px" }}
                    />
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 30, height: 30, m: "4px" }}
                    />
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 30, height: 30, m: "4px" }}
                    />
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 30, height: 30, m: "4px" }}
                    />
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 30, height: 30, m: "4px" }}
                    />
                  </Grid>
                  <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="add"
                    sx={{ m: 2 }}
                    onClick={() => console.log(name, id)}
                  >
                    <AddIcon sx={{ mr: 1 }} />
                    Click Me!
                  </Fab>
                </Box>
              </InfoWindowF>
            ) : null}
          </Marker>
        )
      )}
      <MapCards setActive={setActiveMarker} activeMarker={activeMarker} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);

// import React, { useState } from "react";
// import {
//   GoogleMap,
//   InfoWindow,
//   InfoWindowF,
//   Marker,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import {
//   Avatar,
//   Button,
//   Card,
//   CardActionArea,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Fab,
//   Grid,
//   Paper,
//   Stack,
//   Typography,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { Box } from "@mui/system";
// import { useSelector } from "react-redux";

// const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL;
// const GOOGLE_API = process.env.REACT_APP_GOOGLE_MAPS_APIKEY;

// const markers = [
//   {
//     id: 1,
//     name: "Chicago, Illinois",
//     position: { lat: 51.1165, lng: 22.6084 },
//   },
//   {
//     id: 2,
//     name: "Denver, Colorado",
//     position: { lat: 51.1165, lng: 22.9084 },
//   },
//   {
//     id: 3,
//     name: "Los Angeles, California",
//     position: { lat: 51.1165, lng: 21.6084 },
//   },
//   {
//     id: 4,
//     name: "New York, New York",
//     position: { lat: 50.1165, lng: 22.6084 },
//   },
// ];

// const containerStyle = {
//   width: "100vw",
//   height: "100vh",
//   // position: "fixed",
//   // width: "100vw",
//   // height: "100%",
// };

// const center = {
//   lat: 51.2465,
//   lng: 22.5684,
// };

// function MyComponent() {
//   const spots = useSelector((state) => state.spots);
//   const [activeMarker, setActiveMarker] = useState(null);

//   const handleActiveMarker = (marker) => {
//     if (marker === activeMarker) {
//       return;
//     }
//     setActiveMarker(marker);
//   };

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: GOOGLE_API,
//   });

//   const [map, setMap] = React.useState(null);

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds(center);

//     markers.forEach(({ position }) => bounds.extend(position));
//     map.fitBounds(bounds);

//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={8}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//       position="fixed"
//       onClick={() => setActiveMarker(null)}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           zIndex: 1,
//           position: "absolute",
//           top: "30px",
//           right: "30px",
//           height: "90%",
//           maxWidth: "300px",
//         }}
//       >
//         <Grid
//           container
//           spacing={2}
//           sx={{
//             px: 2,
//             overflowY: "scroll",
//             height: "100%",
//             display: "flex",
//             alignItems: "center",
//             marginTop: '0px',
//           }}
//         >
//           {spots.map(({ id, attributes: { name, desc, image } }) => (
//             <Grid key={id} item xs={12} sm={12} md={12}>
//               <Card id={id} sx={{ maxWidth: 345 }}>
//                 <CardActionArea>
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={`${UPLOADS_URL}${image.data.attributes.url}`}
//                     alt="green iguana"
//                   />
//                   <CardContent>
//                     <Typography gutterBottom variant="h5" component="div">
//                       {name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {desc}
//                     </Typography>
//                   </CardContent>
//                 </CardActionArea>
//                 <CardActions></CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Paper>
//       {markers.map(({ id, name, position }) => (
//         <Marker
//           key={id}
//           position={position}
//           onClick={() => handleActiveMarker(id)}
//         >
//           {activeMarker === id ? (
//             <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
//               <Box sx={{ maxWidth: "200px", textAlign: "center" }}>
//                 <div>{name}</div>
//                 <Grid sx={{ display: "flex", flexFlow: "wrap", mt: 1 }}>
//                   <Avatar
//                     alt="Remy Sharp"
//                     src="/static/images/avatar/1.jpg"
//                     sx={{ width: 30, height: 30, m: "4px" }}
//                   />
//                   <Avatar
//                     alt="Remy Sharp"
//                     src="/static/images/avatar/1.jpg"
//                     sx={{ width: 30, height: 30, m: "4px" }}
//                   />
//                   <Avatar
//                     alt="Remy Sharp"
//                     src="/static/images/avatar/1.jpg"
//                     sx={{ width: 30, height: 30, m: "4px" }}
//                   />
//                   <Avatar
//                     alt="Remy Sharp"
//                     src="/static/images/avatar/1.jpg"
//                     sx={{ width: 30, height: 30, m: "4px" }}
//                   />
//                   <Avatar
//                     alt="Remy Sharp"
//                     src="/static/images/avatar/1.jpg"
//                     sx={{ width: 30, height: 30, m: "4px" }}
//                   />
//                   <Avatar
//                     alt="Remy Sharp"
//                     src="/static/images/avatar/1.jpg"
//                     sx={{ width: 30, height: 30, m: "4px" }}
//                   />
//                   <Avatar
//                     alt="Remy Sharp"
//                     src="/static/images/avatar/1.jpg"
//                     sx={{ width: 30, height: 30, m: "4px" }}
//                   />
//                   <Avatar
//                     alt="Remy Sharp"
//                     src="/static/images/avatar/1.jpg"
//                     sx={{ width: 30, height: 30, m: "4px" }}
//                   />
//                   <Avatar
//                     alt="Remy Sharp"
//                     src="/static/images/avatar/1.jpg"
//                     sx={{ width: 30, height: 30, m: "4px" }}
//                   />
//                 </Grid>
//                 <Fab
//                   variant="extended"
//                   size="medium"
//                   color="primary"
//                   aria-label="add"
//                   sx={{ m: 2 }}
//                   onClick={() => console.log(name, id)}
//                 >
//                   <AddIcon sx={{ mr: 1 }} />
//                   Click Me!
//                 </Fab>
//               </Box>
//             </InfoWindowF>
//           ) : null}
//         </Marker>
//       ))}
//       <></>
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// }

// export default React.memo(MyComponent);
