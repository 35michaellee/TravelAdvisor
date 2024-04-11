import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from '@material-ui/core';

import Header from "./Components/Header/Header";
import Map from "./Components/Map/Map";
import List from "./Components/List/List";
import { getPlacesData,getWeatherData } from "./api";

const App = () => {
    const [places, setPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null);
    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState({});
    const [isLoading, setIsLoading] = useState(false); //helpswhen places is empty we need to wait 
    const [type,setType]= useState('restaurants');
    const [rating,setRating]=useState('');
    const [filteredPlaces, setFilterdPlaces] = useState([]);
    const [autocomplete, setAutocomplete] = useState(null);
    const [weatherData,setWeatherData] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                console.log(latitude, longitude);
                setCoords({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error("Error getting geolocation:", error);
            }
        );
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const wdata = await getWeatherData(coords.lat, coords.lon);
                setWeatherData(wdata);
                const data = await getPlacesData(type,bounds.sw, bounds.ne);
                setPlaces(data?.filter((place)=> place.name && place.num_reviews >0));
        
            
            } catch (error) {
                console.error('Error fetching data inn GetPlacesData:', error);
            } finally {
                setFilterdPlaces([]);
                setIsLoading(false);
            }
        };

        if (coords && (bounds.sw && bounds.ne)) {
            fetchData();
        }
    }, [type, bounds]);
    console.log("places:",places);
    console.log("Filtered places",filteredPlaces);

    useEffect(() => {
        console.log("childClicked state changed:", childClicked);
    }, [childClicked]); // Add this useEffect to log childClicked changes
    useEffect(()=>{
        const filteredPlacess= places.filter((place)=>place.rating >rating);
        setFilterdPlaces(filteredPlaces);
    },[rating]);
    const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

    return (
        <>
            <CssBaseline />
            <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        isLoading={isLoading}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoords={setCoords} 
                        setBounds={setBounds}
                        coords={coords}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData ={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default App;