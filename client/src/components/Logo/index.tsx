import React from 'react';
import logo from '../../assets/gym.png'
import './logo.css';

const Logo: React.FC = () => {

    return (
        <>
            <img
                src={logo}
                alt="Gym Hub Logo"
            />
        </>


    );
};

export default Logo;