import React from "react";
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "../context/context";
import axios from "../api/axios";

const SearchInput = ({ setIsLoading, setAddTrue, setRefetch, refetch }) => {
    const { searchUserValue, setSearchUserValue, refreshAccessToken, user, setUserInfo } = useGlobalContext();
    const { accessToken } = user

    const handleInputChange = (e) => {
        setSearchUserValue(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };


    const SearchUsersInfo = async (token) => {
        setIsLoading(true)
        try {
            const res = await axios.get(`admin/users/search/?q=${searchUserValue}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            const { users } = res.data
            setUserInfo(users)
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                SearchUsersInfo(refreshedToken); // try the request again with the new token
            } else {
                console.log(err);
                setIsLoading(false)
            }
        }
    }


    const handleSearchUsers = () => {
        if (searchUserValue !== "") {
            SearchUsersInfo(accessToken)
            setAddTrue(false)
        } else {
            setIsLoading(true)
            setRefetch(!refetch)
            setAddTrue(true)
        }
    }



    return (
        <form className="search-form" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search..."
                value={searchUserValue}
                onChange={handleInputChange}
            />
            <button onClick={handleSearchUsers} type="submit" className="search-button">
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchInput;
