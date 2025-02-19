import React from 'react'
import { BriefcaseBusiness, HeartIcon, Settings, LogOut } from "lucide-react";
import profile from '/profile.jpg';

const Profile = ({handleProfileClick}) => {
  return (
    <div className='absolute top-24 right-4' onClick={handleProfileClick}>
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
  )
}

export default Profile
