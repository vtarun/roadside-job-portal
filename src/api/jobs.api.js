import apiRequest from "@/utils/apiRequest";

export async function postJob() {
    try { 

    } catch (err) {
        console.error("Error fetching jobs:", err.message);
        throw err;
    }
}

export async function deleteJob() {
    try { 

    } catch (err) {
        console.error("Error fetching jobs:", err.message);
        throw err;
    }
}

export async function getAllJobs(filters) {
    try {
        const query = new URLSearchParams(filters).toString();
        return await apiRequest(`/jobs/get-jobs?${query}`, "GET", null, true);
    } catch (err) {
        console.error("Error fetching jobs:", err.message);
        throw err;
    }
}

export async function updateJobStatus(jobId, isOpen) {
    try {
        return await apiRequest(`/jobs/update-job/${jobId}`, "PUT", { isOpen }, true);
    } catch (err) {
        console.error("Error fetching jobs:", err.message);
        throw err;
    }
}

export async function getJobById(jobId) {
    try {
        return await apiRequest(`/jobs/get-job/${jobId}`, "GET", null, true);
    } catch (err) {
        console.error("Error fetching jobs:", err.message);
        throw err;
    }
}

export async function getSavedJobs() {
    try {
        return await apiRequest(`/saved-jobs`, "GET", null, true);
    } catch (err) {
        console.error("Error fetching jobs:", err.message);
        throw err;
    }
}

export async function saveOrRemoveJob() {
    try {
        
    } catch (err) {
        console.error("Error fetching jobs:", err.message);
        throw err;
    }
}
