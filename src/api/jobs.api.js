import apiRequest from "@/utils/apiRequest";

export async function postJob(data) {
    try { 
        return await apiRequest('/jobs/post-job', "POST", data, true);
    } catch (err) {
        console.error("Error fetching jobs:", err.message);
        throw err;
    }
}

export async function deleteJob(jobId) {
    try { 
        return await apiRequest(`/jobs/delete-job/${jobId}`, "DELETE", null, true);
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
        return await apiRequest(`/profile/saved-jobs`, "GET", null, true);
    } catch (err) {
        console.error("Error fetching jobs:", err.message);
        throw err;
    }
}

export async function saveOrRemoveJob(jobId) {
    try {
        return await apiRequest(`/profile/saved-jobs/${jobId}`, "PUT", {}, true);
    } catch (err) {
        console.error("Error fetching jobs:", err.message);
        throw err;
    }
}

// Fetch jobs created by the recruiter
export async function getCreatedJobs() {
    try {
      return await apiRequest('/jobs/created', 'GET', null, true);
    } catch (err) {
      console.error("Error fetching created jobs:", err.message);
      throw err;
    }
}
  
// Fetch jobs applied to by the candidate
export async function getAppliedJobs() {
    try {
      return await apiRequest('/jobs/applied', 'GET', null, true);
    } catch (err) {
      console.error("Error fetching applied jobs:", err.message);
      throw err;
    }
}
