'use client';
import React from 'react';

interface Props { }

function Page(props: Props) {
    return (
        <div className='col-span-3  border-2 flex items-center justify-center h-full rounded-lg'>
            <div className='text-center w-full'>
                Click on a friend to chat !!!!
            </div>
        </div>
    );
}

export default Page;
