import React, { useEffect, useState } from "react";

const Search = (props) => {
  const [searchText, setSearchText] = useState("");
  
  const handleChange = (e) => {
    setSearchText(e.target.value);
    props.onSearch(searchText);
  };

  useEffect(() => {
    props.onSearch(searchText);
  }, [searchText]);

  return (
    <div style={{ textAlign: "center" }}>
      <input 
      type="text"
       placeholder="Search Country"
        onChange={handleChange}
         />
    </div>
  );
};

export default Search;
