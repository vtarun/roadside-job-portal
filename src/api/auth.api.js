import apiRequest from "@/utils/apiRequest";

export async function signUpAPi(firstname, lastname, email, password) {
    return await apiRequest("/auth/signup", "POST", { firstname, lastname, email, password });
}

export async function loginApi(email, password) {
    return await apiRequest("/auth/login", "POST", { email, password });
}