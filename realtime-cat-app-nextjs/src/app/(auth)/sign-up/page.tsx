'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { set } from 'mongoose';
import { Loader2 } from 'lucide-react';

interface Props { }

function Page() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const response = await axios.post('api/sign-up', {
                email: email,
                username: username,
                password: password
            });

            console.log(response.data);
            setError('');
            router.push('/sign-in');
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data?.error || 'Sign-up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const gotoSignIn = () => {
        router.push('/sign-in');
    };

    return (
        <div className='flex items-center justify-center min-h-screen h-fit w-screen'>
            <Card className='w-[450px]'>
                <CardHeader>
                    <CardTitle className='text-2xl'>
                        Sign Up
                    </CardTitle>
                    <CardDescription>
                        Create your new account
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col items-center justify-center gap-5'>
                    <div className='flex flex-col space-y-1.5 w-full'>
                        <Label
                            htmlFor="email"
                            className='text-sm'
                        >Email:</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            autoComplete='off'
                        />
                    </div>
                    <div className='flex flex-col space-y-1.5 w-full'>
                        <Label
                            htmlFor="username"
                            className='text-sm'
                        >Username:</Label>
                        <Input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            autoComplete='off'
                        />
                    </div>
                    <div className='flex flex-col space-y-1.5 w-full'>
                        <Label
                            htmlFor="password"
                            className='text-sm'
                        >Password:</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                </CardContent>
                <CardFooter className='flex flex-col space-y-4 items-center'>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className='flex justify-between w-full'>
                        <Button
                            variant={'outline'}
                            onClick={gotoSignIn}
                        >
                            Sign in
                        </Button>
                        <Button onClick={handleSignUp}>
                            {loading? <Loader2 className='animate-spin'/>:"Sign up"}</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Page;
