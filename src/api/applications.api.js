import apiRequest from "@/utils/apiRequest";

export async function applyForJob() {
    try { 
        return await apiRequest('/jobs/post-job', "POST", data, true);
    } catch (err) {
        console.error("Error fetching jobs:", err.message);
        throw err;
    }
}

export async function updateApplicationStatus(status, applicationId) {
    try { 
        return await apiRequest(`/applications/update-application/${applicationId}`, "PUT", {status}, true);
    } catch (err) {
        console.error("Error fetching jobs:", err.message);
        throw err;
    }
}

export async function getApplications() {
    
}
