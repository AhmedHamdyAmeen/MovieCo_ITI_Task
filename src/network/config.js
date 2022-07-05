import axios from 'axios';



const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org",
    params: {
        'api_key': "99dbba108d81c1a48d5136fb6e3ebbe7"
    }
})

export default axiosInstance;