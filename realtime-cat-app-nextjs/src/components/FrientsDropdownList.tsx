'use client'
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FriendInterface } from '@/constants';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation'; // Import useRouter

interface FriendsDropdownListProps {
    friends: FriendInterface[];
}

const FriendsDropdownList: React.FC<FriendsDropdownListProps> = ({ friends }) => {
    const pathname = usePathname(); // Use useRouter to get the current path

    return (
        <div className='md:hidden'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button>
                        Friends
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {friends.map((friend) => (
                        <DropdownMenuItem key={friend.id}>
                            <Link
                                href={`/dashboard/${friend.id}`}
                                className={`w-full rounded-sm h-[50px] flex gap-4 items-center border-b-2 px-4 text-gray-800 ${pathname === `/dashboard/${friend.id}` ? 'bg-gray-200 font-medium' : 'bg-white'} text-sm py-2`}
                            >
                                {friend.name}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default FriendsDropdownList;
