import { Button } from '@/components/ui/button';
import React from 'react'
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main>
      <section className='flex flex-col gap-5 text-center mt-10 mb-10'>
        <h1 className='flex flex-col text-6xl items-center'>Find Your Dream Job {' '}
          <span className="flex text-6xl "> and get 
            <img src="/logo.png" alt="Hirrd Logo" className="h-16 px-4 sm:h-20 lg:h-24"/>
          </span>
        </h1>
        <p>Explore thousands of jobs listings or find the perfect candidate</p>
      </section>
      <div className='flex justify-center items-center gap-10 sm:gap-6'>
        <Link to="/jobs"><Button size="lg">Find Jobs</Button></Link>
        <Link to="/post-job"><Button size="lg" variant="destructive">Post a Job</Button></Link>
      </div>
      {/* carousel */}
      {/* banner */}

      <section>

      </section>
    </main>
  )
}

export default LandingPage;
