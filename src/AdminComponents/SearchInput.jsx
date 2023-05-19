import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Perform search logic with the searchValue
        console.log("Perform search with:", searchValue);
    };

    return (
        <form className="search-form" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={handleInputChange}
            />
            <button type="submit" className="search-button">
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchInput;
