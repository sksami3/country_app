import "./App.css";
import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import "./index.css";
import Search from "./components/Search";

var url = "https://restcountries.com/v3.1/all";

const App = () => {
  const [isLoading, SetIsLoading] = useState(true);
  const [error, SetError] = useState(null);
  const [countries, SetCountries] = useState([]);
  const [filteredCountryList, SetFilterCountries] = useState(countries);

  const fetchData = async (url) => {
    SetIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      SetCountries(data);
      SetFilterCountries(data);
      SetIsLoading(false);
    } catch (error) {
      SetIsLoading(false);
      SetError(error.message);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  const handleOnRemoveCountry = (name) => {
    const filtedData = filteredCountryList.filter((country) => 
        country.name.common !== name
    );
    SetFilterCountries(filtedData);
  };

  const setSearchText = (searchValue) => {
    let value = searchValue.toLowerCase();
    const newCountries = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.includes(value);
    });
    
    SetFilterCountries(newCountries);
  }

  return (
    <section>
      <h1>Country App</h1>
      <Search onSearch={setSearchText}/>
      {isLoading && <h2>Is Loading.....</h2>}
      {error && <h2>{error}</h2>}
      {countries && (
        <Countries
          countries={filteredCountryList}
          onRemoveCountry={handleOnRemoveCountry}
        />
      )}
    </section>
  );
};

export default App;
