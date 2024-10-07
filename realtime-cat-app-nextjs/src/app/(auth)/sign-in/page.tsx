'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';

interface Props { }

function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    console.log(result);
    if (result?.error) {
      setError('Login failed: ' + result.error);
    } else {
      setError('');
      console.log('Login successful');
      // You can redirect the user manually or handle successful login
    }
    setLoading(false);
    if (result?.url) {
      router.replace('/dashboard');
    }
    
  };
  const gotoSignUp = () => {
    router.replace('/sign-up');
  }

  return (
    <div className='flex items-center justify-center min-h-screen h-fit w-screen'>
      <Card className='w-[450px] items-center'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            Sign In
          </CardTitle>
          <CardDescription>
            Sign in to your account
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
        <CardFooter className='flex flex-col gap-2 items-center justify-center w-full'>
          <div className='flex justify-between w-full'>
          <Button
            variant={'outline'}
            onClick={gotoSignUp}>
            Sign up
          </Button>
          <Button onClick={handleSignIn}>{loading ? <LoaderCircle className='animate-spin'/> : "Sign In"}</Button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
