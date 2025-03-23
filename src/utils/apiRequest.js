import { getToken } from "./getToken";

const API_URL = import.meta.env.VITE_JOB_PORTAL_API_URL || "http://localhost:4000";

async function apiRequest(endpoint, method = "GET", body = null, hasToken = false, hasFile = false) {
    let headers = {
        "Content-Type": "application/json",
    };
    let tempBody;
    if(method === 'POST' && hasFile){
        headers = {};
        tempBody = body;
    }else{
        tempBody = body ? JSON.stringify(body) : null
    }

    if (hasToken) {
        const token = getToken();
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: tempBody,
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData?.message || "An error occurred");
    }

    return responseData;
}

export default apiRequest;