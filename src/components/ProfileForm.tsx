"use client";

import React, { useState, useEffect, useRef } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { useRouter } from 'next/navigation';
import { useAccount } from "wagmi";
import { config } from '@/lib/config'
import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';

interface PatientFormState {
    name: string;
    age: string;
    country: string;
    gender: string;
    category: string;
    uniqueId: string;
}

const ProfileForm: React.FC = () => {
    const router = useRouter();
    const address = useAccount();
    console.log("address", address)

    const [formState, setFormState] = useState<PatientFormState>({
        name: '',
        age: '',
        country: '',
        gender: '',
        category: '',
        uniqueId: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const uniqueId = uuidv4(); // Generate a unique ID for the NFT  
        console.log("handle submit called", formState, uniqueId)

        const contractAddress = 'YOUR_CONTRACT_ADDRESS';
        const abi = [
            "function mintPatientNFT(address to, string memory name, uint256 age, string memory country, string memory gender, string memory category, string memory uniqueId) public"
        ];

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const transaction = await contract.mintPatientNFT(
                await signer.getAddress(),
                formState.name,
                parseInt(formState.age),
                formState.country,
                formState.gender,
                formState.category,
                uniqueId
            );

            console.log('Minting transaction:', transaction);
        } catch (error) {
            console.error('Error minting NFT:', error);
        }
    };
    return (
        <div>
            {/* create nft form  */}
            <div className="flex flex-col items-center align-between justify-center">
                <div className="w-full pt-5 max-w-lg">
                    <form onSubmit={handleSubmit}>
                        <div className=" flex flex-col text-left mb-6">
                            <label htmlFor="text" className=" mb-2 text-lg font-medium text-white dark:text-white">Your Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className=" flex flex-row text-left gap-4 ">
                            <div className=" flex flex-col text-left mb-6 md:w-1/2">
                                <label htmlFor="text" className=" mb-2 text-lg font-medium text-white dark:text-white">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formState.age}
                                    onChange={handleChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </div>
                            <div className=" flex flex-col text-left mb-6 md:w-1/2">
                                <label htmlFor="text" className=" mb-2 text-lg font-medium text-white dark:text-white">Gender</label>
                                <select
                                    name="gender"
                                    value={formState.gender}
                                    onChange={handleChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className=" flex flex-col text-left mb-6">
                            <label htmlFor="text" className=" mb-2 text-lg font-medium text-white dark:text-white">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formState.country}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>

                        <div className=" flex flex-col text-left mb-6">
                        <label htmlFor="text" className=" mb-2 text-lg font-medium text-white dark:text-white">Category</label>
                            <select
                                name="category"
                                value={formState.category}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            >
                                <option value="">Select</option>
                                <option value="male">Patient</option>
                                <option value="female">Doctor</option>
                                <option value="other">Institute</option>
                            </select>
                        </div>

                        <button type="submit" className="flex justify-start relative text-lg px-8 py-3 bg-[#98ee2c]  mr-5 uppercase font-Agda font-bold text-black hover:bg-[#f0f0f0] cursor-pointer" >
                            Mint Your Identity Pass
                            <BsArrowRight className='mt-1 ml-2' />
                        </button>
                    </form>

                    <dialog id="my_modal_3" className="modal">
                        <form method="dialog" className="modal-box">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => { router.push('/event') }} >✕</button>
                            <h3 className="font-bold text-lg">🎉 PlayVerse NFT Minted 🎉</h3>
                            <p className="py-4">Create Your NFT Based Event Now</p>
                        </form>
                    </dialog>

                </div>
            </div>
        </div>
    )
}

export default ProfileForm;