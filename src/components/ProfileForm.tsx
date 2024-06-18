"use client";

import React, { useState, useEffect, useRef } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { useRouter } from 'next/navigation';
import { useAccount } from "wagmi";
import { config } from '@/lib/config'
import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';
import IdentityPassNFT from '@/lib/contracts/IdentityPassNFT.json';
import { IdentityCardContract } from '@/lib/constant'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getIDByAddress } from "@/lib/interact";
import Link from 'next/link';
import { useAtom } from 'jotai';
import { userAtom } from '@/lib/atom';
import { set } from 'react-hook-form';
// declare module 'uuid';

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
    const account = useAccount();
    const address = account.address;
    console.log("userAddress");

    // @ts-ignore
    const nftId = getIDByAddress(address);
    console.log("nftId", nftId)

    const [userProfile, setUserProfile] = useAtom(userAtom);
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
        // @ts-ignore
        setUserProfile(formState);
        const uniqueId = uuidv4(); // Generate a unique ID for the NFT  
        console.log("handle submit called", formState, uniqueId)

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(IdentityCardContract, IdentityPassNFT.abi, signer);

        try {
            const transaction = await contract.mintIdentityNFT(
                formState.name,
                parseInt(formState.age),
                formState.country,
                formState.gender,
                formState.category,
                uniqueId
            );

            console.log('Minting transaction:', transaction);
            toast.success("Identity Pass Minted !", {
                position: "top-center"
            });

            toast(
                <div>
                    Link - {`https://holesky.fraxscan.com/tx/${transaction}`}
                    {"top-center"}
                    < button > Retry</button>
                </div >
            )

        } catch (error) {
            console.error(error);
            toast.error("Identity Pass Minting Failed !", {
                position: "top-right"
            });

            toast(
                <div>
                    {/* @ts-ignore */}
                    {error?.reason}
                    {/* by default will show on top-right */}
                </div>
            )
        }
    };
    return (
        <div>
            <div className="grid mb-0 pt-5 pb-5 mt-0 md:mb-10 md:grid-cols-2 ">
                <figure className="flex flex-col pt-10 ">
                    <div className="text-left align-left w-[650px] p-8 pl-[100px]">
                        <div className="mb-2  bg-gradient-to-r from-[#fff] via-[#fff]/80 to-[#9d9ea1]/50 bg-clip-text 
                    text-transparent font-bold font-Agda text-[80px] uppercase md:max-w-5xl max-w-[575px]">
                            Create Your Pass</div>
                        <p className='text-white pb-10'>
                            Create your own Identity Pass as a NFT. <br />
                        </p>
                        <Link href={`/patients/${address}/register`}
                            className="inline-flex align-left items-center relative text-lg px-8 py-3 bg-white  mr-5 uppercase font-Agda font-bold text-black hover:bg-[#f0f0f0] cursor-pointer" >
                            ALREADY MINTED YOUR NFT PASS
                            <BsArrowRight className=' ml-2' />
                        </Link>
                    </div>
                </figure>

                <figure className="flex flex-col items-center justify-center pt-10 ">
                    <div className="text-center px-[50px] align-middle w-[600px]  py-10 bg-[#202020] rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700">
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
                                            <option value="patient">Patient</option>
                                            <option value="doctor">Doctor</option>
                                            <option value="institute">Institute</option>
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
                </figure>
            </div>
            {/* create nft form  */}

            <ToastContainer />
        </div>
    )
}

export default ProfileForm;