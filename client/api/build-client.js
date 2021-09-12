import axios from "axios";
export default ({ req }) => {
    if (typeof window === "undefined") {
        // server
        return axios.create({
            baseURL: "http://localhost:5000/api",
            headers: req.headers,
        });
    } else {
        // browser
        return axios.create({
            baseURL: "http://localhost:5000/api",
        });
    }
};
