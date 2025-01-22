import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";

import homeLogo from '/logo.png'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <>
        <nav className='py-4 flex justify-between items-center'>
            <Link to="/">
                <img src={homeLogo} className="h-20" />
            </Link>

            

            <SignedOut>
                <Button variant="outline">Login</Button>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </nav>
    </>
 );
}

export default Header;
