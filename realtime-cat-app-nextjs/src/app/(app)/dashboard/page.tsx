'use client'
import FriendsDropdownList from '@/components/FrientsDropdownList';
import { friends } from '@/constants';

import React from 'react';

interface Props {}

function Page(props: Props) {
    

    return (
        <div className='col-span-4 md:col-span-3 lg:col-span-3 border-2 flex items-center justify-center h-full rounded-lg'>
            <div className='text-center w-full flex flex-col'>
                <div className='md:hidden m-2'>
                    {/* Passing onSelectFriend to FriendsDropdownList */}
                    <FriendsDropdownList friends={friends}/>
                </div>
                Click on a friend to chat !!!!
            </div>
        </div>
    );
}

export default Page;
