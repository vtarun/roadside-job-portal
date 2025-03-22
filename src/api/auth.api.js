const API_URL = import.meta.env.VITE_JOB_PORTAL_API_URL || "http://localhost:4000";

export async function signUpAPi(firstname, lastname, email, password) {
    const response = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({firstname, lastname, email, password}),    
      });
      const data = await response.json();

      if(!response.ok) {
        throw new Error(data?.message ||"failed to register user");
    }
    return data;
}

export async function loginApi(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password}),    
    });
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data?.message || "Invalid credentials");
    }

    return data;      
}