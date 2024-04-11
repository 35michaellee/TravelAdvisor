import axios from 'axios';



export const getPlacesData = async (type,sw, ne) => {
    try {
        if (!sw || !ne || !sw.lat || !ne.lat || !sw.lng || !ne.lng) {
            
            //throw new Error(sw+ne+'Invalid coordinates passed to getPlacesData');
        }
        else{
         
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_TRAVEl_API_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        });
        
        return data;
    }
    } catch (error) {
        console.error('Error with travel advisor fetch:', error);
        throw error; // Rethrow the error for higher-level error handling
    }
};


export const getWeatherData = async (lat, lon) => {
    const options = {
      method: 'GET',
      url: 'https://open-weather13.p.rapidapi.com',
      params: { lon: lon, lat: lat, },
      headers: {
        'X-RapidAPI-Key': '9031173153msh3c2311613afec70p1e00a9jsn508c4514c1dc',
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}