import axios from 'axios';

const URL='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


export const  getPlacesData = async (sw,ne) => {
    try {
        const { data : {data}} = await axios.get(URL,{

 
  params: {
    bl_latitude: sw.lat,
    tr_latitude: ne.lat,
    bl_longitude: sw.lng,
    tr_longitude: ne.lng,
    
  },
  headers: {
    'X-RapidAPI-Key': '9031173153msh3c2311613afec70p1e00a9jsn508c4514c1dc',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
});

        return data;
    } catch (error) {
        console.error(error);
    }

}
 