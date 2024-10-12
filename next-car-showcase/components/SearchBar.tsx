"use client";

import SearchManufacturer from "./SearchManufacturer";
import { useState } from "react";

const SearchBar = ({title}) => {
  const [manufacturer, setManufacturer] = useState("");
  const handleSearch = () => {};

  return (
    <form onSubmit={handleSearch} className="searchbar">
      <div className="searchbar__item">
        <SearchManufacturer 
            manufacturer={manufacturer}
            setManufacturer={setManufacturer}
        />
      </div>
    </form>
  );
};

export default SearchBar;
