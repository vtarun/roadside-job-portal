import apiRequest from "@/utils/apiRequest";

export async function getCompanies() {
    try {
        return await apiRequest("/companies/get-companies", "GET", null, true);
    } catch (err) {
        console.error("Error fetching companies:", err.message);
        throw err;
    }
}