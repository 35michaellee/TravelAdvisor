import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography,useMediaQuery} from '@material-ui/core';
import LocationOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';
import useStyles from "./styles"
// import { GpsOffOutlined } from '@material-ui/icons';
// import { GoogleMapReact } from '@react-google-maps/api';


    const Map =({setCoordinates,setBounds,coordinates})=> {
  
    const classes=useStyles();
    const isMobile = useMediaQuery ('(min-width:600px)');
    
    
    return(
        <div className={classes.mapContainer}>
             <GoogleMapReact
                bootstrapURLKeys={{key:'AIzaSyDZVIoL5usCAWx_3ypwPLVPZ4sF3GnkIdw'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange= 
                 {(e)=>{
                    console.log("hello set coordinatees",e);
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                onChildClick={null}
            >

            </GoogleMapReact>

           
        </div>
    )
    
};

export default Map;