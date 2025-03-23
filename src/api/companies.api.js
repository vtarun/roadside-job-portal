import apiRequest from "@/utils/apiRequest";

export async function getCompanies() {
    try {
        return await apiRequest("/companies/get-companies", "GET", null, true);
    } catch (err) {
        console.error("Error fetching companies:", err.message);
        throw err;
    }
}

export async function createCompany(formData) {
    try{
        return await apiRequest("/companies/create", "POST", formData, true, true); // "hasFile = true" for last params
    } catch(err) {
        console.error("Error fetching companies:", err.message);
        throw err;
    }
}