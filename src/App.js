import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import countriesData from './countries.json';
import statesData from './states.json';
import timezonesData from './timezones.json'; 

const countryStatesMap = {};

const countriesWithStates = countriesData.map(country => ({
  ...country,
  states: [] 
}));

statesData.forEach(state => {
  if (countryStatesMap[state.countrycode] === undefined) {
    countryStatesMap[state.countrycode] = [];
  }
  countryStatesMap[state.countrycode].push(state);
});

const statesWithTimezones = statesData.map(state => {
  const timezoneInfo = timezonesData.find(tz => tz.statecode === state.statecode);
  return {
    ...state,
    timezones: timezoneInfo ? [timezoneInfo] : [] 
  };
});

countriesWithStates.forEach(country => {
  if (countryStatesMap[country.countrycode] !== undefined) {
    country.states = countryStatesMap[country.countrycode].map(state => ({
      ...state,
      timezones: statesWithTimezones.find(s => s.statecode === state.statecode).timezones
    }));
  }
});

function App() {
  const [countries, setCountries] = useState(countriesWithStates);

  useEffect(() => {
    console.log('Countries with States:', countries);
  
    // Convert the modified data to JSON
    const jsonData = JSON.stringify(countries, null, 2);
  
    // Create a Blob from the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
  
    // Save the Blob as a file using FileSaver.js
    saveAs(blob, 'modified_countries.json');
  }, [countries]);
  

  return (
    <div>
      
    </div>
  );
}

export default App;
