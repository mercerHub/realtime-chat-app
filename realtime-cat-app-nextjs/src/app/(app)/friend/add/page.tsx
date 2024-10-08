'use client';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'

interface Props { }

function Page(props: Props) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAddFriend = async () => {
        setLoading(true);
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            setLoading(false);
            return;
        } else {
            setError("");
        }
        try {
            const response = await axios.post('/api/friend/add', { email });
            console.log(response.data);
        } catch (error: any) {
            console.error(error);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col gap-2 items-center justify-center h-full'>
            <div className='flex flex-col gap-3 items-center justify-center md:min-w-[400px] min-w-[50%] p-2'>
                <h1 className='lg:text-3xl md:text-2xl font-bold w-full'>Add Friend</h1>
                <div className='w-full'>
                    <Label htmlFor="email">Email:</Label>
                    <Input type="email" id="email" autoComplete='off' onChange={e => setEmail(e.target.value)} />
                </div>
                <Button className='w-full' onClick={handleAddFriend}>{loading ? <Loader2 className='animate-spin' /> : "ADD"}</Button>
                {error && <div className='text-red-500'>{error}</div>}
            </div>
        </div>
    )
}

export default Page
