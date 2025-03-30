import React, {useEffect, useState} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import Profile from './profile';


import homeLogo from '/logo.png';
import profile from '/profile.jpg';
import LoginPage from '@/pages/Login';
import { useAuth } from './auth-provider';

const Header = () => {
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user } = useAuth();

  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if( !user && search.get('sign-in')){
      setShowSignInForm(true);
    }else{
      setShowSignInForm(false);
    }
  }, [search, user]);

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
  }

  return (
    <>
        <nav className='py-4 flex justify-between items-center'>
            <Link to="/">
                <img src={homeLogo} className="h-20" />
            </Link>

            <div className="flex gap-8">
                
                {!user && <Button variant="outline" onClick={() => setShowSignInForm(true)}>Login</Button>}
                
                {user && user?.role === 'recuiter' && <Link to="/post-job">
                    <Button variant="destructive" className="rounded-full">
                        <PenBox size={20} className="mr-2" />Post a Job
                    </Button>
                </Link>}
                
                {user && <div className="w-10 h-10 rounded-full border border-red-200 overflow-hidden hover:scale-110">
                    <button onClick={handleProfile}><img src={profile} alt="profile"/></button>
                </div>          
                }
            </div>
        </nav>

        {showSignInForm && 
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
              <LoginPage handleSuccessfullSignIn={handleSuccessfullSignIn}/>
            </div>  
        }

        {showProfile && <Profile handleProfileClick={handleProfile}/>}
    </>
 );
}

export default Header;
