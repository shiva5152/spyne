import axios from "axios";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_ENDPOINT || "http://localhost:8000";
const instance = axios.create({
    // development
    baseURL: `${serverUrl}/api/v1`,
    withCredentials: true,

});

export default instance;