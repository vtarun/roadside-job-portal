import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormValues(prev => {
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const loginUser = async ({email, password}) => {
    try{   
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password}),    
      });
      if(!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      console.log(data);
      navigate('/onboarding');
    } catch(error){
      console.log(error);

    }

  }

  const signUpUser = async ({firstname, lastname, email, password}) => {
    try{

    
    const response = await fetch('http://localhost:4000/auth/signup', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({firstname, lastname, email, password}),    
    });

    const data = await response.json();
    localStorage.setItem('token', data.token);
    console.log(data);

  }catch(error){
    console.log(error);
  }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Convert FormData to a usable object
    const data = Object.fromEntries(formData.entries());

    console.log("Form Data:", data);
    if(!isSignUp) {
      loginUser(data);
    } else{
      signUpUser(data);
    }
  }

  return (
    <div className="flex justify-between items-center">
      <div className="w-96 login-form  rounded-lg">
      <div className="flex flex-col gap-8">
        <div className='flex flex-col justify-center items-center'>
            <h1>Sign in to roadside</h1>
            <p>Welcom back! Please sign in to continue</p>
        </div>

        <div>
            <div className='flex justify-evenly items-center px-8 '>
                <Button>Github</Button>
                <Button>Google</Button>
            </div>
            <div className='flex justify-center items-center px-8 '>
                <div className="h-0.5"></div>
                <p>or</p>
                <div className="h-0.5"></div>
            </div>
            <form className="flex flex-col items-stretch justify-start gap-8 px-8 py-4" onSubmit={handleSubmit}>
                {isSignUp && <div className="flex justify-center items-center">
                  <div>
                      <label>First name</label>
                      <Input placeholder="First name" name="firstname" type="text" value={formValues.firstname} onChange={handleInputChange}/>
                  </div>
                  <div>
                      <label>Last name</label>
                      <Input placeholder="Last name" name="lastname" type="text" value={formValues.lastname} onChange={handleInputChange} />
                  </div>
                </div>}
                <div>
                    <label>Email address</label>
                    <Input placeholder="Email address" name="email" type="email" value={formValues.email} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Password</label>
                    <Input placeholder="password" name="password" type="password" value={formValues.password} onChange={handleInputChange} />
                </div>
                <Button type="submit">Continue</Button>
            </form>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        <p>Don't have an account? <span className="cursor-pointer" onClick={() => setIsSignUp((prev) => !prev)}>{isSignUp ? 'Sign up' : 'Login'}</span></p>
      </div>
    </div>
    </div>
  )
}

export default LoginPage
