"use client";
import React from 'react'
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs'
import ProfileForm from '@/components/ProfileForm';
import { useAccount } from 'wagmi';

export default function Create() {
    const address = useAccount().address;
    return (
        <div className='h-screen bg-black'>
            <ProfileForm />
        </div>
    )
}
