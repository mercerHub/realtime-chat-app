'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FriendsCard from '@/components/FriendsCard';

interface LayoutProps {
    children: React.ReactNode;
  }

const Layout: React.FC<LayoutProps> = ({children})=>{

    const { data: session } = useSession();
    const router = useRouter();
    if (!session) router.replace('/sign-in');

    return (
        <div className='grid grid-cols-4 gap-4 h-full'>
            <FriendsCard/>
            {children}
        </div>
    )
}

export default Layout
