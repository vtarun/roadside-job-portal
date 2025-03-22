import { getToken } from "./getToken";

const API_URL = import.meta.env.VITE_JOB_PORTAL_API_URL || "http://localhost:4000";

async function apiRequest(endpoint, method = "GET", body = null, hasToken = false) {
    const headers = {
        "Content-Type": "application/json",
    };

    if (hasToken) {
        const token = getToken();
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData?.message || "An error occurred");
    }

    return responseData;
}

export default apiRequest;