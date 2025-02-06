import React, {useEffect, useState} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from "./ui/button";
import { BriefcaseBusiness, HeartIcon, PenBox, Settings, LogOut } from "lucide-react";

import homeLogo from '/logo.png';
import profile from '/profile.jpg';
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from '@clerk/clerk-react';

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const {user} = useUser();
  const [showProfile, setShowProfile] = useState(false);

  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if(search.get('sign-in')){
        setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    console.log(e.target, e.currentTarget);
    if(e.target === e.currentTarget){
        setShowSignIn(false);
        setSearch({});
        setShowProfile(false);
    }
  }

  const handleProfile = () => {
    setShowProfile(prev => !prev);
  }

  return (
    <>
        <nav className='py-4 flex justify-between items-center'>
            <Link to="/">
                <img src={homeLogo} className="h-20" />
            </Link>

            <div className="flex gap-8">
                <div className="w-10 h-10 rounded-full border border-red-200 overflow-hidden hover:scale-110">
                    <button onClick={handleProfile}><img src={profile} alt="profile"/></button>
                </div>
                <SignedOut>
                    <Button variant="outline" onClick={() => setShowSignIn(true)}>Login</Button>
                </SignedOut>
                <SignedIn>
                    {user?.unsafeMetadata?.role === 'recuiter' && <Link to="/post-job">
                        <Button variant="destructive" className="rounded-full">
                            <PenBox size={20} className="mr-2" />Post a Job
                        </Button>
                    </Link>}
                    <UserButton appearance={{
                        elements: {
                            avatarBox: "w-10 h-10"
                        },
                    }}>
                        <UserButton.MenuItems>
                            <UserButton.Link
                                label="My Jobs"
                                labelIcon={<BriefcaseBusiness size={15} />}
                                href="/my-jobs"
                            />

                            <UserButton.Link
                                label="Saved Jobs"
                                labelIcon={<HeartIcon size={15} />}
                                href="/saved-jobs"
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                </SignedIn>
            </div>
        </nav>

        {showSignIn && <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
            <SignIn signUpForceRedirectUrl='/onboarding' fallbackRedirectUrl='/onboarding' />
            </div>  
        }

        {showProfile && 
            <div className='absolute top-24 right-4' onClick={handleOverlayClick}>
                <div className="rounded-lg border w-full sm:w-2/3 md:w-1/2 lg:w-96 lg:top-20 lg:right-0 font-sans font-light profile-background">
                    <div className='flex p-4 gap-4 items-center w-full'>
                        <span className="w-12 h-12 rounded-full border overflow-hidden">
                            <img src={profile} alt="profile"/>
                        </span>
                        <span className='font-medium'>vit1@gmail.com</span>
                    </div>
                    <div className="border-t-[1px] border-[rgba(255,255,255,0.07)] flex p-4 items-center w-full profile__item">
                        <button className="flex items-center gap-8 px-4 "><Settings size={18}/>Manage account</button>
                    </div>
                    <div className="border-t-[1px] border-[rgba(255,255,255,0.07)] flex p-4 gap-4 items-center w-full profile__item">
                        <button className="flex items-center gap-8 px-4"><BriefcaseBusiness size={18}/>My Jobs</button>
                    </div>
                    <div className="border-t-[1px] border-[rgba(255,255,255,0.07)] flex p-4 gap-4 items-center w-full  profile__item">
                        <button className="flex items-center gap-8 px-4"><HeartIcon size={18}/> Saved Jobs</button>
                    </div>
                    <div className="border-t-[1px] border-[rgba(255,255,255,0.07)] flex p-4 items-center w-full  profile__item">
                        <button className="flex items-center gap-8 px-4"><LogOut size={18} />Sign Out</button>
                    </div>
                </div>                
            </div>
        }
    </>
 );
}

export default Header;
