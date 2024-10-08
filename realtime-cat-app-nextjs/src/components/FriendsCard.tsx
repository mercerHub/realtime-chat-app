import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CircleUser } from 'lucide-react'
import { friends } from '@/constants'

interface Props {}


function FriendsCard(props: Props) {
    const pathname = usePathname()

    return (
        <>
            <div className="col-span-1 h-full hidden lg:block md:block">
                <Card className="h-full bg-zinc-100">
                    <CardHeader>
                        <CardTitle className="text-2xl">Friends</CardTitle>
                        <CardDescription>List of your friends</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col">
                        {friends.map((friend) => (
                            <div key={friend.id} className="flex items-center justify-between">
                                <Link
                                    href={`/dashboard/${friend.id}`}
                                    className={`w-full rounded-sm h-[50px] flex gap-4 items-center border-b-2 px-4 text-gray-800 ${
                                        pathname === `/dashboard/${friend.id}`
                                            ? 'bg-gray-50 font-medium'
                                            : 'bg-white'
                                    } text-sm py-2`}
                                >
                                    <CircleUser className="w-4 h-4" />
                                    {friend.name}
                                </Link>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            
        </>
    )
}

export default FriendsCard
