import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useAuthApi from '@/hooks/useAuthAPI';
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

  const {login} = useAuth();
  const { loading, error, loginUser, signUpUser } = useAuthApi();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormValues(prev => {
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Convert FormData to a usable object
    const data = Object.fromEntries(formData.entries());
    try{
      const response = isSignUp 
        ? await signUpUser(data.firstname, data.lastname, data.email, data.password)
        : await loginUser(data.email, data.password);
      
      if (response?.success) {
        login(response.user, response.token);
        handleSuccessfullSignIn();
        navigate('/onboarding');
      }
    }catch(err){
      console.error("Error: ", err.message);
    }
  }

  return (
    <div className="flex justify-between items-center">
      <div className="w-96 login-form  rounded-lg">
      <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
            <h1>{isSignUp ? "Sign up for roadside" : "Sign in to roadside"}</h1>
            <p>{isSignUp ? "Create an account to get started" : "Welcome back! Please sign in to continue"}</p>
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
                        <label htmlFor='firstname'>First name</label>
                        <Input id="firstname" placeholder="First name" name="firstname" type="text" value={formValues.firstname} onChange={handleInputChange}/>
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
                <Button type="submit" disabled={loading}>{loading ? "Loading..." : "Continue"}</Button>
            </form>
        </div>
      </div>
      {/* Error Message */}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      <div className="flex gap-2 mb-6 justify-center">
        <p>{!isSignUp ? "Don't have an account?" : "Already have an account?"}{" "} <span className="cursor-pointer underline" onClick={() => setIsSignUp((prev) => !prev)}>{isSignUp ? 'Login': 'Sign up'}</span></p>
      </div>
    </div>
    </div>
  )
}

export default LoginPage
