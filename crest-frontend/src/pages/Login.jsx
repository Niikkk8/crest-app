import React, { useState } from 'react';
import "../App.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Login() {
    const [loginInterface, setLoginInterface] = useState(false);
    const [signUpFormData, setSignUpFormData] = useState({
        signUpName: '',
        signUpEmail: '',
        signUpPassword: ''
    });
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [selectedInterest, setSelectedInterest] = useState('');
    const [showOptionsModal, setShowOptionsModal] = useState(false);

    const toggleLoginInterface = () => {
        setLoginInterface(!loginInterface);
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!selectedInterest) {
                // If the user hasn't selected an interest, show the options modal
                setShowOptionsModal(true);
                return;
            }
            const userCredentials = await createUserWithEmailAndPassword(auth, signUpFormData.signUpEmail, signUpFormData.signUpPassword);
            await setDoc(doc(db, "users", userCredentials.user.uid), {
                userName: signUpFormData.signUpName,
                userEmail: signUpFormData.signUpEmail,
                userPassword: signUpFormData.signUpPassword,
                userInterest: selectedInterest
            });
            setSignUpFormData({
                signUpName: '',
                signUpEmail: '',
                signUpPassword: ''
            });
            setShowOptionsModal(false); // Close options modal after signup
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };
        

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log("Logged in user:", userCredentials.user.uid);
            // Redirect or do something after successful login
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignUpFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInterestChange = (interest) => {
        setSelectedInterest(interest);
    };
    return (
        <div className="flex flex-col md:flex-row justify-center md:justify-around items-center max-w-[1400px] m-auto h-screen">
            <div className="w-[80%] text-center md:w-[50%]">
                <h1 className="text-5xl md:text-7xl font-normal mb-6">Join now!</h1>
                <h2 className="text-2xl md:text-4xl font-normal mb-4">Learn today.</h2>
                {loginInterface ? (
                    <>
                        <form onSubmit={handleSignUpSubmit}>
                            <div>
                                <input
                                    type="text"
                                    name="signUpName"
                                    placeholder="Your Name"
                                    className="w-[80%] border border-black p-2.5 m-1 rounded-lg focus:border-blue-700 outline-none"
                                    value={signUpFormData.signUpName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="signUpEmail"
                                    placeholder="E-mail"
                                    className="w-[80%] border border-black p-2.5 m-1 rounded-lg focus:border-blue-700 outline-none"
                                    value={signUpFormData.signUpEmail}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="signUpPassword"
                                    placeholder="Password"
                                    className="w-[80%] border border-black p-2.5 m-1 rounded-lg focus:border-blue-700 outline-none"
                                    value={signUpFormData.signUpPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowOptionsModal(true)} // Open options modal
                                className="mt-4 text-medium bg-blue-700 w-[80%] py-2 text-white rounded-full border-[1px] border-blue-700 focus:bg-transparent focus:text-black"
                            >
                                Choose Your Interest
                            </button>
                            <button
                                type="submit"
                                className="mt-2 text-medium bg-blue-700 w-[80%] py-2 text-white rounded-full border-[1px] border-blue-700 focus:bg-transparent focus:text-black"
                            >
                                Sign up
                            </button>
                        </form>
                        <div className="flex justify-around items-center w-[90%] mt-4 mb-2 m-auto">
                            <hr className="w-[40%]" />
                            <p>OR</p>
                            <hr className="w-[40%]" />
                        </div>
                        <span>
                            Already a member?
                            <button className="underline ml-2" onClick={toggleLoginInterface}>Sign-in</button>
                        </span>
                    </>
                ) : (
                    <>
                        <form onSubmit={handleLoginSubmit}>
                            <div>
                                <input
                                    type="email"
                                    className="w-[80%] border border-black p-2.5 m-1 rounded-lg focus:border-blue-700 outline-none"
                                    placeholder="E-mail"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    name="loginPassword"
                                    className="w-[80%] border border-black p-2.5 m-1 rounded-lg focus:border-blue-700 outline-none"
                                    placeholder="Password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 text-medium bg-blue-700 w-[80%] py-2 text-white rounded-full border-[1px] border-blue-700 focus:bg-transparent focus:text-black"
                            >
                                Sign in
                            </button>
                        </form>
                        <div className="flex justify-around items-center w-[90%] mt-4 mb-2 m-auto">
                            <hr className="w-[40%]" />
                            <p>OR</p>
                            <hr className="w-[40%]" />
                        </div>
                        <span className="text-[16px]">
                            New here?
                            <button className="underline ml-2" onClick={toggleLoginInterface}>
                                Sign-up
                            </button>
                        </span>
                    </>
                )}
            </div>
            {showOptionsModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Choose Your Interest</h2>
                        <div className="flex justify-center items-center mb-4">
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    value="frontend"
                                    checked={selectedInterest === 'frontend'}
                                    onChange={() => handleInterestChange('frontend')}
                                />
                                Frontend
                            </label>
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    value="backend"
                                    checked={selectedInterest === 'backend'}
                                    onChange={() => handleInterestChange('backend')}
                                />
                                Backend
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="fullstack"
                                    checked={selectedInterest === 'fullstack'}
                                    onChange={() => handleInterestChange('fullstack')}
                                />
                                Fullstack
                            </label>
                        </div>
                        <button
                            onClick={() => setShowOptionsModal(false)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
