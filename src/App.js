import "./App.css";
import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import "./index.css";

var url = "https://restcountries.com/v3.1/all";

const App = () => {
  const [isLoading, SetIsLoading] = useState(true);
  const [error, SetError] = useState(null);
  const [countries, SetCountries] = useState(null);
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

  return (
    <section>
      <h1>Country App</h1>
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
