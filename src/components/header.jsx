import React, {useEffect, useState} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import Profile from './profile';


import homeLogo from '/logo.png';
import profile from '/profile.jpg';
// import { SignIn } from '@clerk/clerk-react';
import LoginPage from '@/pages/Login';

const Header = () => {
  const [user, setUser] = useState({role: 'recuiter'});
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if(search.get('sign-in')){
      setShowSignInForm(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if(e.target === e.currentTarget){
      setShowSignInForm(false);
        setSearch({});
        setShowProfile(false);
    }
  }

  const handleProfileClick = () => {
    console.log('profile div clicked');
  }

  const handleProfile = () => {
    setShowProfile(prev => !prev);
  }

  const handleSuccessfullSignIn = () => {
    setShowSignInForm(false);
    setShowProfile(true);
    setIsLoggedIn(true);
  }

  return (
    <>
        <nav className='py-4 flex justify-between items-center'>
            <Link to="/">
                <img src={homeLogo} className="h-20" />
            </Link>

            <div className="flex gap-8">
                {showProfile && <div className="w-10 h-10 rounded-full border border-red-200 overflow-hidden hover:scale-110">
                    <button onClick={handleProfile}><img src={profile} alt="profile"/></button>
                </div>          
                }
                {!isLoggedIn && <Button variant="outline" onClick={() => setShowSignInForm(true)}>Login</Button>}
                
                {isLoggedIn && user?.role === 'recuiter' && <Link to="/post-job">
                    <Button variant="destructive" className="rounded-full">
                        <PenBox size={20} className="mr-2" />Post a Job
                    </Button>
                </Link>}
            </div>
        </nav>

        {showSignInForm && <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
            <LoginPage handleSuccessfullSignIn={handleSuccessfullSignIn}/>
            {/* <SignIn /> */}
            </div>  
        }

        {showProfile && <Profile handleProfileClick={handleProfileClick}/>}
    </>
 );
}

export default Header;
