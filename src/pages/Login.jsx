import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({handleSuccessfullSignIn}) => {
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
      if(data?.success === true){
        handleSuccessfullSignIn();
        navigate('/onboarding');
      }
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
    if(data?.success === true){
      handleSuccessfullSignIn();
      navigate('/onboarding');
    }
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
            <div className='flex justify-between items-center gap-4 px-8 '>
                <Button className="w-full">Github</Button>
                <Button className="w-full">Google</Button>
            </div>
            <div className='flex justify-center items-center py-4 px-4 '>
                
                <p>or</p>
            </div>
            <form className="flex flex-col items-stretch justify-start gap-8 px-8 py-4" onSubmit={handleSubmit}>
                {isSignUp && 
                  <div className="flex justify-center items-center gap-2 ">
                    <div>
                        <label>First name</label>
                        <Input placeholder="First name" name="firstname" type="text" value={formValues.firstname} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label>Last name</label>
                        <Input placeholder="Last name" name="lastname" type="text" value={formValues.lastname} onChange={handleInputChange} />
                    </div>
                  </div>
                }
                <div>
                    <label>Email address</label>
                    <Input placeholder="Email address" name="email" type="text" value={formValues.email} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Password</label>
                    <Input placeholder="password" name="password" type="password" value={formValues.password} onChange={handleInputChange} />
                </div>
                <Button type="submit">Continue</Button>
            </form>
        </div>
      </div>
      <div className="flex gap-2 mb-6 justify-center">
        <p>{!isSignUp ? "Don't have an account?" : "Already have an account?"} <span className="cursor-pointer underline" onClick={() => setIsSignUp((prev) => !prev)}>{isSignUp ? 'Login': 'Sign up'}</span></p>
      </div>
    </div>
    </div>
  )
}

export default LoginPage
