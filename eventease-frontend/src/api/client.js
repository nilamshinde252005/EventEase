// configure Axios for your entire frontend.---- so that for every req i send i dont need to add authorization token bearer , this file automaticaly does that

// Axios instance (here -client) that already knows:
    // the backend base URL.
    // how to automatically attach JWT tokens.
    // how to behave before every request

// config is simply an object that contains everything about your request.

import axios from "axios";

// Create an Axios instance
const client = axios.create({
    baseURL: "http://localhost:4000/api",
});

// Add a request interceptor = runs before every request 
    // :Before a request goes out → "Check if the user is logged in. If yes, attach the passport."
client.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

export default client;
