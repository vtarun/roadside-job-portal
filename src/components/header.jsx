import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";

import homeLogo from '/logo.png'

const Header = () => {
  return (
    <>
        <nav className='py-4 flex justify-between items-center'>
            <Link>
                <img src={homeLogo} className="h-20" />
            </Link>

            <Button variant="outline">Login</Button>
        </nav>
    </>
 );
}

export default Header;
