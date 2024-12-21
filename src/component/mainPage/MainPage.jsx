import React from 'react';
import { Navigate } from 'react-router-dom';
import "./MainPage.css"

export default function MainPage({ userData, onLogout }) {
    if (!userData) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <div className="container">
            <div className="text-center">
                <div className="welcome-container">
                    <h1 className="welcome-text">
                        Welcome to
                        <span className="block text-primary font-semibold">Unstop</span>
                    </h1>
                </div>
                <div className="bg-white text-center border-2 rounded-lg p-5 text-sm shadow-md">
                    <img
                        src={userData.image}
                        alt="Profile"
                        className="rounded-full overflow-hidden mx-auto mb-2"
                    />
                    <h2 className="text-primary mb-2">{userData.firstName} {userData.lastName}</h2>
                    <p className="mb-2">{userData.email}</p>
                    <p className="mb-2">{userData.gender}</p>
                    <button onClick={onLogout} className="bg-primary p-4 text-white text-center rounded-2xl block w-full mb-3  shadow-sm">Logout</button>
                </div>
            </div>
        </div>
    );
}



