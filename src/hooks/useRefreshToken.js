import axios from '../api/axios';
import { useGlobalContext } from '../context/context';

const useRefreshToken = () => {
    const { setUser } = useGlobalContext();

    const refresh = async () => {
        const response = await axios.post('/newtoken', {
            withCredentials: true
        });
        setUser(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
