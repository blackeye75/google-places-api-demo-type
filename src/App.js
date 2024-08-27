// import React, { useState } from "react";
// import "./App.css";
// import SearchLocationInput from "./components/GooglePlcasesApi";
// import MapComponent from "./components/Map";

// function App() {
//   const [selectedLocation, setSelectedLocation] = useState({
//     lat: 28.7041,
//     lng: 77.1025,
//   });
//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <SearchLocationInput setSelectedLocation={setSelectedLocation} />
//       <MapComponent selectedLocation={selectedLocation} />
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual API key

const FetchPlacesData = () => {
  const [places, setPlaces] = useState([]);

  const getPlacesData = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json`, {
          params: {
            query: 'drone suppliers and survey consultancy',
            location: '28.6139,77.2090', // Latitude and Longitude for New Delhi, India
            radius: 1000000, // 1,000,000 meters (1000 km)
            key: API_KEY,
          }
        }
      );

      const placesResults = response.data.results;
      const detailedPlaces = await Promise.all(
        placesResults.map(async (place) => {
          const detailsResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json`, {
              params: {
                place_id: place.place_id,
                fields: 'name,formatted_address,formatted_phone_number,website',
                key: API_KEY,
              }
            }
          );
          return detailsResponse.data.result;
        })
      );

      setPlaces(detailedPlaces);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={getPlacesData}>Get Drone Suppliers & Survey Consultancy Info in India</button>
      <ul>
        {places.map((place, index) => (
          <li key={index}>
            <h3>{place.name}</h3>
            <p>Address: {place.formatted_address}</p>
            <p>Phone: {place.formatted_phone_number}</p>
            <p>Website: <a href={place.website} target="_blank" rel="noopener noreferrer">{place.website}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchPlacesData;
