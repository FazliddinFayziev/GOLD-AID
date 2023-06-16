import React, { useEffect, useState } from 'react';
import "../css/HomeCSS/banner.css";
import { white_background_image } from '../assets';
import { useGlobalContext } from '../context/context';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const HerroBanner = () => {

    const { refreshAccessToken, user, isRefreshTokenExpired } = useGlobalContext();
    const [quote, setQuote] = useState([]);
    const navigate = useNavigate();

    // FETCHING THE DATA (QUOTES) (GET METHOD)
    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshTokenExpireTime = localStorage.getItem('refreshTokenExpireTime');

        const fetchQuotes = async (token) => {
            try {
                const res = await axios.get('/quotes', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(res.data);
                const { quote } = res.data
                setQuote(quote)
            } catch (err) {
                if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchQuotes(refreshedToken); // try the request again with the new token
                } else {
                    console.log(err);
                }
            }
        };

        useEffect(() => {
            const fetch = async () => {
                const token = await refreshAccessToken()
                await fetchQuotes(token)
                if (!token) return navigate('/login')
                console.log('Access token is fetching the courses')
            }
            fetch()
        }, [])

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                    .then((token) => fetchQuotes(token))
                    .catch((err) => console.log(err));
            }, 3000000); // fetches new urls and tokens every 50 minutes
            return () => clearInterval(timer);
        }, []);

        useEffect(() => {
            if (!refreshToken || !refreshTokenExpireTime) {
                navigate('/register');
            }
            else if (isRefreshTokenExpired()) {
                navigate('/login');
            }
        }, []);

        return accessToken;
    };

    const accessToken = useToken();

    return (
        <div className='home-banner'>
            <div className='home-cover'></div>
            <div className='home-banner-img'>
                <img src={white_background_image} alt="banner-image" />
            </div>
            {quote.map((item) => {
                return (
                    <p key={item._id}>{item.quote}</p>
                )
            })}
        </div>
    )

}

export default HerroBanner;
