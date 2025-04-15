import React from 'react'
import { BriefcaseBusiness, HeartIcon, Settings, LogOut } from "lucide-react";
import profile from '/profile.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './auth-provider';

const Profile = ({handleProfileClick}) => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }
  return (
    <div className='absolute top-24 right-4' onClick={handleProfileClick}>
        <div className="rounded-lg border w-full lg:w-96 lg:top-20 lg:right-0 font-sans font-light profile-background">
            <div className='flex p-4 gap-4 items-center w-full'>
                <span className="w-12 h-12 rounded-full border overflow-hidden">
                    <img src={profile} alt="profile"/>
                </span>
                <span className='font-medium'>{user?.email}</span>
            </div>
            <div className="border-t-[1px] border-[rgba(255,255,255,0.07)] flex p-4 items-center w-full profile__item">
                <button className="flex items-center gap-8 px-4 "><Settings size={18}/>Manage account</button>
            </div>
            <div className="border-t-[1px] border-[rgba(255,255,255,0.07)] flex p-4 gap-4 items-center w-full profile__item">
                <Link className="flex items-center gap-8 px-4" to="/my-jobs"><BriefcaseBusiness size={18}/>My Jobs</Link>
            </div>
            <div className="border-t-[1px] border-[rgba(255,255,255,0.07)] flex p-4 gap-4 items-center w-full  profile__item">
                <Link className="flex items-center gap-8 px-4" to="/saved-jobs"><HeartIcon size={18}/> Saved Jobs</Link>
            </div>
            <div className="border-t-[1px] border-[rgba(255,255,255,0.07)] flex p-4 items-center w-full  profile__item">
                <button className="flex items-center gap-8 px-4" onClick={handleLogout}><LogOut size={18} />Sign Out</button>
            </div>
        </div>                
    </div>
  )
}

export default Profile
