import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="fixed inset-0 flex justify-between items-center bg-black bg-opacity-50">
      <div className="w-96 login-form">
      <div className="flex flex-col gap-8">
        <div className='flex flex-col justify-center items-center'>
            <h1>Sign in to roadside</h1>
            <p>Welcom back! Please sign in to continue</p>
        </div>

        <div>
            <div className='flex justify-center items-center'>
                <Button>Github</Button>
                <Button>Google</Button>
            </div>
            <div className='flex justify-center items-center'>
                <div className="h-0.5"></div>
                <p>or</p>
                <div className="h-0.5"></div>
            </div>
            <form className="flex flex-col items-stretch justify-start gap-8">
                <div>
                    <label>Email address</label>
                    <Input></Input>
                </div>
                <div>
                    <label>Password</label>
                    <Input></Input>
                </div>
                <Button>Continue</Button>
            </form>
        </div>
      </div>
      <div className="flex gap-2 bg-stone-500">
        <p>Don't have an account? <span onClick={() => showSignupForm(true)}>Sign up</span></p>
      </div>
    </div>
    </div>
  )
}

export default LoginPage
