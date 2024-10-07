import { SendHorizontal } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

interface Props {}

function ChatInterface(props: Props) {
    const {} = props

    return (
        <>
            <div className='bg-hero-pattern col-span-3 flex flex-col border-2 rounded-xl justify-between p-4 bg-zinc-100'>
                <div className='h-[80%]'></div>
                <div className='h-[10%] grid grid-cols-6 gap-4'>
                    <input type="text" className='border-2 rounded-xl col-span-5 px-8'/>
                    <Button
                        variant={'default'}
                        className='h-full col-span-1 border-2 rounded-xl items-center flex justify-center'>
                        <SendHorizontal/>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ChatInterface
