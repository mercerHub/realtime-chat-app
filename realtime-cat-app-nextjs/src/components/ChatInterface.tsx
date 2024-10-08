import { SendHorizontal } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import FriendsDropdownList from './FrientsDropdownList'
import { friends } from '@/constants'

interface Props {}

function ChatInterface(props: Props) {
    const {} = props

    return (
        <>
            <div className='bg-hero-pattern col-span-4 md:col-span-3 flex flex-col border-2 rounded-xl justify-between p-4 bg-zinc-100'>
                <FriendsDropdownList friends={friends}/>
                <div className='h-[80%]'></div>
                <div className='h-[10%] grid grid-cols-6 gap-4'>
                    <input type="text" className='border-2 rounded-xl col-span-5 px-8'/>
                    <Button
                        variant={'default'}
                        className='h-full col-span-1 border-2 md:rounded-xl rounded-full items-center flex justify-center p-2'>
                        <SendHorizontal size={25}/>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ChatInterface
